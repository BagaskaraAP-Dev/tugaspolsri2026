# Tugas POLSRI 2026 - IT-FESTIVAL 2026

Prototype website IT-FESTIVAL 2026, Jurusan Manajemen Informatika, Politeknik Negeri Sriwijaya. Pembaruan lokal: 21 September 2026.

## Tampilan Terbaru

- Logo Belida lokal pada navbar dan favicon.
- Ilustrasi Ampera disimpan sebagai file PNG lokal dan digunakan sebagai latar hero.
- Strip informasi menampilkan `16 SEP - 30 OKT 2026`. Tulisan kecil di bawah logo menampilkan `POLITEKNIK NEGERI SRIWIJAYA`.
- Empat pose Belibit: Siap Tempur, Cyber Coder, Trophy Belida, dan Retro Gamer.
- Tujuh ilustrasi khusus: MLBB, Free Fire, Vibe Coding, CTF, fotografi, pelatihan Vibe Coding, dan pelatihan Cyber Security.
- Ilustrasi tampil pada kartu dan halaman detail acara; gambar kartu dapat diklik.
- Sampul WebP yang lebih ringan untuk seluruh kompetisi dan pelatihan, disertai PNG asli dan gambar referensi terkait.
- Katalog 9 acara, filter kategori, login/register lokal, dashboard, pendaftaran solo/tim, konfirmasi, dan e-ticket.
- Tata letak responsif untuk desktop, tablet, dan ponsel.

## Menjalankan Lokal

Buka `index.html` langsung di browser dengan seluruh folder gambar tetap di tempatnya. Font dan pustaka CDN memerlukan koneksi internet.

Untuk menggunakan server lokal, buka terminal di folder proyek ini:

```powershell
npm.cmd install
npm.cmd start
```

Buka http://127.0.0.1:4174. Jika port tersebut sedang dipakai:

```powershell
npm.cmd start -- -p 4175
```

## Akun Demo

```text
Email    : demo@itfest.id
Password : password123
```

Akun, pendaftaran, dan tiket tersimpan di browser. Tiket merupakan simulasi lokal dan tetap memerlukan validasi panitia.

## Pemeriksaan Otomatis

Setelah `npm.cmd install`, jalankan:

```powershell
npm.cmd run verify
```

Script menggunakan Google Chrome yang terpasang dan otomatis membuka `index.html` dari folder proyek ini. Tidak ada alamat folder komputer tertentu yang ditanam dalam script. Pengujian memakai sesi browser terpisah dari akun pengguna.

Jika menggunakan Chromium bawaan Playwright:

```powershell
npx.cmd playwright install chromium
$env:BROWSER_CHANNEL = "chromium"
npm.cmd run verify
```

Cakupan pemeriksaan: pemuatan logo dan seluruh ilustrasi, filter katalog, detail acara, login/register, validasi formulir, kepemilikan tiket, cetak tiket, dan tata letak mobile. Screenshot terbaru, PDF tiket contoh, dan `results.json` disimpan di `verification/`. File hasil diperbarui dengan nama yang sama setiap pemeriksaan.

## Struktur Aset

```text
index.html
belida.jpg
cyberbelida.jpg
belibit-idle.png
belibit-cyber-coder.png
belibit-trophy.png
belibit-retro-gamer.png
assets/hero/
  ampera-palembang.png
assets/events/
  belibit-*.webp
  source/belibit-*.png
  PROMPTS.md
verify.cjs
package.json
package-lock.json
verification/
```

Ilustrasi dibuat dengan image_gen berdasarkan Belibit Cyber Coder. Prompt setiap gambar dicatat di `assets/events/PROMPTS.md`. Ilustrasi Ampera ada di `assets/hero/ampera-palembang.png`; gambar itu dipakai langsung oleh hero website. `cyberbelida.jpg` adalah referensi awal, empat PNG di folder utama adalah pose maskot aktif, dan `assets/events/source/` menyimpan versi asli tujuh ilustrasi acara. Semua gambar terkait ini dipertahankan. Sertakan seluruh aset saat memindahkan atau mengunggah proyek.

## Dokumentasi

- `PROJECT_PLAN_PRD_TRD_DRD.md`: rencana dan dokumentasi gabungan.
- `PRD.md`: kebutuhan produk.
- `TRD.md`: implementasi, aset, dan verifikasi.
- `DRD.md`: identitas visual serta tata letak.

## Deployment

Website: https://tugasvibecodingpolsri.mooncrust.my.id.

Alamat Vercel: https://it-festival-2026.vercel.app.

Repository GitHub: https://github.com/BagaskaraAP-Dev/tugaspolsri2026. Proyek Vercel yang digunakan adalah `it-festival-2026`.

Kode, dokumentasi, dan seluruh gambar terkait disimpan di GitHub. `.vercelignore` mengecualikan kredensial lokal, dependensi pengembangan, dan hasil pengujian dari unggahan website.

Deploy dari folder proyek ke Vercel setelah memeriksa project tujuan:

```powershell
npx.cmd vercel@latest --prod
```
