const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');

const app = pathToFileURL(path.join(__dirname, 'index.html')).href;
const output = path.join(__dirname, 'verification');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ completed: false, app, startedAt: new Date().toISOString() }, null, 2));
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
  if (match[1].trim()) new vm.Script(match[1]);
}

(async () => {
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || 'chrome',
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const runtimeErrors = [];
  const consoleErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  async function check(condition, label) {
    assert.ok(condition, label);
    console.log('PASS: ' + label);
  }
  async function renderedRoute() {
    await page.waitForFunction(() => {
      const [name = 'landing', id] = location.hash.slice(1).split('/');
      if (['register', 'dashboard', 'confirm', 'ticket'].includes(name) && document.querySelector('#auth-modal').open) return true;
      const views = { landing: 'view-landing', events: 'view-events', event: 'view-event-detail', dashboard: 'view-dashboard', register: 'view-form-pendaftaran', confirm: 'view-konfirmasi', ticket: 'view-status' };
      const view = document.getElementById(views[name]);
      if (!view || view.hidden) return false;
      if (name === 'events') return document.querySelector('#event-catalog').dataset.category === (id || 'all');
      if (name === 'event') return document.querySelector('.detail-title')?.textContent === EVENTS.find(event => event.id === id)?.title;
      if (name === 'register') return document.querySelector('#form-event-name').textContent.startsWith(EVENTS.find(event => event.id === id)?.title);
      if (name === 'ticket') return document.querySelector('.ticket')?.getAttribute('aria-label') === 'E-Ticket ' + id;
      return view.children.length > 0;
    });
  }
  async function waitForUrl(pattern) {
    await page.waitForURL(pattern);
    await renderedRoute();
  }
  async function loadImages(selector) {
    const images = page.locator(selector);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(async element => {
        await element.decode();
        if (!element.naturalWidth || !element.naturalHeight) throw Error('Gambar gagal dimuat: ' + element.src);
      });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  async function route(hash) {
    await page.goto(app + '#' + hash, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('#desktop-auth').children.length > 0);
    await renderedRoute();
  }
  async function screenshot(name) {
    await page.locator('#toast').waitFor({ state: 'hidden' });
    await page.screenshot({ path: path.join(output, name + '.png'), fullPage: true });
  }
  async function noOverflow(label) {
    const measure = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    await check(measure.scroll <= measure.width + 1, label + ' has no horizontal overflow');
  }
  async function login(email, password) {
    await page.locator('#desktop-auth [data-auth="login"]').click();
    await page.locator('#login-form [name="email"]').fill(email);
    await page.locator('#login-form [name="password"]').fill(password);
    await page.locator('#login-form [type="submit"]').click();
  }
  try {
    await route('landing');
    await loadImages('.brand-symbol img, #mascot-gallery img');
    await check(await page.locator('.brand-symbol img').getAttribute('src') === 'belida.jpg', 'Local Belida navbar logo');
    await page.evaluate(() => document.fonts.ready);
    const heroDimensions = await page.evaluate(async () => {
      const image = new Image();
      image.src = getComputedStyle(document.querySelector('.hero')).backgroundImage.slice(5, -2);
      await image.decode();
      return [image.naturalWidth, image.naturalHeight];
    });
    await check(heroDimensions[0] === 1536 && heroDimensions[1] === 1024, 'Local Ampera background decodes');
    await screenshot('desktop-landing');
    await noOverflow('Desktop landing');
    await check(await page.locator('#mascot-gallery img').count() === 4, 'Four generated Belibit poses render');
    const eventStarted = await page.evaluate(() => Date.now() >= new Date('2026-10-03T00:00:00+07:00').getTime());
    if (eventStarted) {
      await check((await page.locator('#count-caption').textContent()).includes('KOMPETISI TELAH DIMULAI'), 'Countdown shows the event-started state');
    } else {
      const initialSeconds = await page.locator('#seconds').textContent();
      await page.waitForFunction(seconds => document.querySelector('#seconds').textContent !== seconds, initialSeconds);
      await check(true, 'Countdown ticks');
    }
    await page.getByRole('link', { name: 'JELAJAHI EVENT', exact: true }).click();
    await waitForUrl('**#events');
    await check(await page.locator('.event-card').count() === 9, 'Catalog contains nine events');
    for (const [category, count] of [['kompetisi', 5], ['pelatihan', 2], ['seminar', 2]]) {
      await page.locator('[data-filter="' + category + '"]').click();
      await page.waitForURL('**#events/' + category);
      await check(await page.locator('.event-card').count() === count, category + ' category filter');
      if (category !== 'seminar') {
        await loadImages('.event-cover-art img');
        await check(await page.locator('.event-cover-art img').count() === count, category + ' themed illustrations');
        await screenshot('desktop-' + category);
      }
    }
    for (const id of ['mlbb', 'ff', 'vibe', 'ctf', 'photo', 'training-vibe', 'training-cyber']) {
      await route('event/' + id);
      await loadImages('.event-detail-art img');
      await check((await page.locator('.event-detail-art img').getAttribute('src')).endsWith('belibit-' + id + '.webp'), 'Matching detail artwork: ' + id);
      await noOverflow('Desktop detail ' + id);
    }
    await route('events/kompetisi');
    await page.locator('.event-cover-art').nth(1).click();
    await waitForUrl('**#event/ff');
    await check(await page.locator('.detail-title').textContent() === 'Free Fire (FF)', 'Artwork opens the matching event');
    await screenshot('desktop-event-free-fire');
    await login('demo@itfest.id', 'wrong-password');
    await page.getByText('Email atau password salah.', { exact: true }).waitFor();
    await check(await page.locator('#auth-modal').isVisible(), 'Wrong password stays unauthenticated');
    await page.locator('#login-form [name="password"]').fill('password123');
    await page.locator('#login-form [type="submit"]').click();
    await page.waitForURL('**#dashboard');
    await check(await page.getByText('Belum ada event terdaftar.', { exact: true }).isVisible(), 'Demo login and empty dashboard');
    await route('event/mlbb');
    await page.getByRole('tab', { name: 'BENEFIT', exact: true }).click();
    await check(await page.locator('#detail-benefits').isVisible(), 'Event benefit tab');
    await page.getByRole('tab', { name: 'SYARAT', exact: true }).click();
    await check(await page.locator('#detail-rules').isVisible(), 'Event rules tab');
    await page.getByRole('link', { name: 'DAFTAR SEKARANG', exact: true }).click();
    await page.waitForURL('**#register/mlbb');
    await check(await page.locator('[data-member][required]').count() === 4, 'MLBB requires four teammates besides captain');
    await check(await page.locator('[data-member]').count() === 5, 'MLBB has an optional reserve');
    const inputStyle = await page.locator('[name="leaderName"]').evaluate(input => {
      const css = getComputedStyle(input);
      return { color: css.color, padding: css.paddingTop, height: input.getBoundingClientRect().height };
    });
    await check(inputStyle.color === 'rgb(5, 7, 24)' && inputStyle.padding === '12px' && inputStyle.height >= 46, 'Form fields retain readable text and touch-friendly height');
    await page.locator('[name="teamName"]').fill('Sriwijaya Pixel');
    await page.locator('[name="institution"]').fill('POLSRI');
    await page.locator('#registration-form [name="email"]').fill('team-contact@example.com');
    for (let i = 0; i < 4; i++) await page.locator('[name="member' + i + '"]').fill('Player ' + (i + 2));
    await page.locator('[name="ktmLink"]').fill('https://example.com/invalid');
    await page.locator('[name="consent"]').check();
    await page.locator('#registration-form [type="submit"]').click();
    await page.getByText('Gunakan link Google Drive yang valid untuk KTM / kartu pelajar.', { exact: true }).waitFor();
    await check(true, 'Invalid KTM domain is rejected');
    await page.locator('[name="ktmLink"]').fill('https://drive.google.com/file/d/test-ktm/view');
    await page.locator('[name="paymentLink"]').fill('https://drive.google.com/file/d/test-payment/view');
    await page.locator('#registration-form [type="submit"]').click();
    await page.waitForURL('**#confirm');
    await check(await page.locator('#view-konfirmasi').getByText('Sriwijaya Pixel', { exact: true }).isVisible(), 'Confirmation includes team');
    await screenshot('desktop-confirmation');
    await page.getByRole('link', { name: 'EDIT DATA', exact: true }).click();
    await check(await page.locator('[name="teamName"]').inputValue() === 'Sriwijaya Pixel', 'Edit keeps registration data');
    await check(await page.locator('[name="member0"]').inputValue() === 'Player 2', 'Edit keeps team members');
    await page.locator('#registration-form [type="submit"]').click();
    await page.locator('#confirm-registration').click();
    await page.waitForURL('**#ticket/*');
    const ticketUrl = page.url();
    const ticketId = ticketUrl.split('/').pop();
    await check(/^ITFEST-2026-[0-9A-F]{12}$/.test(ticketId), 'Ticket ID uses random hexadecimal');
    await screenshot('desktop-ticket');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('.ticket').waitFor();
    await check(await page.locator('.ticket').getByText('Sriwijaya Pixel', { exact: true }).isVisible(), 'Ticket survives refresh');
    await page.getByRole('link', { name: 'KEMBALI KE DASHBOARD', exact: true }).click();
    await check(await page.locator('.enrollment').count() === 1, 'Registration belongs to account despite different contact email');
    await page.getByRole('link', { name: 'LIHAT TIKET', exact: true }).click();
    await check(page.url() === ticketUrl, 'Dashboard opens the correct ticket');
    await route('register/mlbb');
    await page.waitForURL('**#ticket/*');
    await check(page.url() === ticketUrl, 'Duplicate registration redirects to existing ticket');
    await page.emulateMedia({ media: 'print' });
    await check(await page.locator('.site-header').isHidden() && await page.locator('.ticket').isVisible(), 'Print hides navigation and preserves ticket');
    await page.pdf({ path: path.join(output, 'ticket-print.pdf'), format: 'A4', printBackground: true });
    await page.emulateMedia({ media: 'screen' });
    await route('register/vibe');
    await check(await page.locator('#team-name-label').isHidden(), 'Vibe coding starts in solo mode');
    await page.locator('[name="participation"][value="team"]').check();
    await check(await page.locator('[data-member][required]').count() === 1, 'Vibe coding team has at most two people');
    await route('register/ff');
    await check(await page.locator('[data-member][required]').count() === 3, 'Free Fire requires a four-person squad');
    await route('register/ctf');
    await check(await page.locator('[data-member]').count() === 2 && await page.locator('[data-member][required]').count() === 0, 'CTF allows up to three people');
    await route('register/photo');
    await check(await page.locator('#team-name-label').isHidden(), 'Photography is solo');
    await page.locator('#desktop-auth [data-logout]').click();
    await page.waitForURL('**#landing');
    await page.locator('#desktop-auth [data-auth="register"]').click();
    await page.locator('#register-form [name="name"]').fill('QA Player <img src=x onerror=alert(1)>');
    await page.locator('#register-form [name="email"]').fill('qa-local@example.com');
    await page.locator('#register-form [name="password"]').fill('QALocalPassword123');
    await page.locator('#register-form [name="wa"]').fill('081234567891');
    await page.locator('#register-form [type="submit"]').click();
    await page.waitForURL('**#dashboard');
    await check(await page.locator('#view-dashboard h1 img').count() === 0, 'User text is escaped');
    await check(await page.locator('.enrollment').count() === 0, 'Second user cannot see first user registrations');
    await page.goto(ticketUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForURL('**#dashboard');
    await check(await page.locator('#view-status').isHidden(), 'Foreign ticket URL is guarded');
    await page.locator('#desktop-auth [data-logout]').click();
    await route('register/photo');
    await page.locator('#auth-modal').waitFor();
    await page.locator('#login-form [name="email"]').fill('qa-local@example.com');
    await page.locator('#login-form [name="password"]').fill('QALocalPassword123');
    await page.locator('#login-form [type="submit"]').click();
    await page.waitForFunction(() => !document.querySelector('#auth-modal').open);
    await page.locator('#view-form-pendaftaran').waitFor();
    await check(page.url().endsWith('#register/photo'), 'Authentication resumes selected event');
    await page.locator('[name="institution"]').fill('QA Campus');
    await page.locator('[name="ktmLink"]').fill('https://drive.google.com/file/d/solo-test/view');
    await page.locator('[name="consent"]').check();
    await page.locator('#registration-form [type="submit"]').click();
    await page.waitForURL('**#confirm');
    await page.locator('#confirm-registration').click();
    await page.waitForURL('**#ticket/*');
    const soloTicket = page.url().split('#')[1];
    await check(await page.locator('.ticket').isVisible(), 'Solo registration completes');
    await page.setViewportSize({ width: 390, height: 844 });
    for (const hash of ['landing', 'events', 'events/kompetisi', 'events/pelatihan', 'event/ff', 'event/training-cyber', 'event/seminar-rahmi', 'dashboard', 'register/ctf', soloTicket]) {
      await route(hash);
      await loadImages('.view:not([hidden]) img');
      await noOverflow('Mobile ' + hash);
      const screenshotName = hash.startsWith('ticket/') ? 'mobile-ticket' : hash === 'event/ff' ? 'mobile-event' : 'mobile-' + hash.replace(/[^a-zA-Z0-9-]/g, '-');
      await screenshot(screenshotName);
    }
    await page.setViewportSize({ width: 320, height: 740 });
    await route('landing');
    await noOverflow('Small mobile landing');
    await page.locator('#menu-toggle').click();
    await check(await page.locator('#mobile-auth [data-logout]').isVisible(), 'Mobile authenticated menu includes logout');
    await screenshot('small-mobile-menu');
    await check(runtimeErrors.length === 0, 'No JavaScript runtime errors');
    await check(!consoleErrors.some(message => /regular expression|SyntaxError|TypeError/.test(message)), 'No invalid form patterns or console syntax errors');
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ runtimeErrors, consoleErrors, ticketId, completed: true, app, completedAt: new Date().toISOString(), themedIllustrations: 7, mascotPoses: 4 }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
