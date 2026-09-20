# TRD - Technical Requirements Document

Versi dokumen: 21 September 2026, sesuai implementasi lokal terbaru.

### 4.1 Stack Teknologi

1. HTML5.
2. CSS internal dalam satu file.
3. JavaScript vanilla.
4. Tailwind CSS CDN.
5. Google Fonts CDN.
6. FontAwesome CDN.
7. jQuery CDN.
8. Canvas Confetti CDN.
9. localStorage.
10. WebCrypto API.

### 4.2 Struktur File

```text
tugaspolsri2026/
  index.html
  README.md
  verify.cjs
  package.json
  package-lock.json
  belida.jpg
  cyberbelida.jpg
  belibit-*.png
  assets/hero/ampera-palembang.png
  assets/events/
    belibit-*.webp
    source/belibit-*.png
    PROMPTS.md
  PRD.md
  TRD.md
  DRD.md
  PROJECT_PLAN_PRD_TRD_DRD.md
  verification/
  .gitignore
```

### 4.3 Penyimpanan Lokal

Key localStorage yang digunakan:

```text
itfest_users
itfest_currentUser
itfest_registrations
```

Fungsi penyimpanan:

1. `itfest_users` menyimpan daftar user.
2. `itfest_currentUser` menyimpan sesi user aktif.
3. `itfest_registrations` menyimpan data pendaftaran dan e-ticket.

### 4.4 Keamanan Frontend

1. Password tidak disimpan sebagai plain text.
2. Password menggunakan PBKDF2 SHA-256.
3. Input user di-escape sebelum dirender.
4. Pendaftaran dikaitkan dengan `userId`.
5. Dashboard hanya menampilkan pendaftaran milik user aktif.
6. Route tiket asing dilindungi dari akses user lain.

### 4.5 Routing

Routing menggunakan hash URL agar cocok untuk hosting statis:

```text
location.hash
hashchange event
route()
```

Keuntungan hash routing:

1. Tidak perlu konfigurasi server rewrite.
2. Cocok untuk Vercel static hosting.
3. Bisa langsung dibuka lewat file lokal.

### 4.6 Validasi Form

Validasi utama:

1. Nama peserta atau nama tim wajib diisi.
2. Ketua dan email kontak wajib diisi.
3. Nomor WhatsApp harus valid.
4. Instansi wajib diisi.
5. Link kartu identitas wajib berupa URL Google Drive.
6. Checkbox persetujuan wajib dicentang.
7. Team member wajib sesuai kebutuhan event.

### 4.7 Deployment

Sumber proyek disimpan di repository GitHub `BagaskaraAP-Dev/tugaspolsri2026` dan dipublikasikan melalui proyek Vercel `it-festival-2026`. `.vercelignore` mengecualikan kredensial lokal, dependensi pengembangan, dokumentasi, dan hasil pengujian dari unggahan website.

Platform: Vercel

Project: `it-festival-2026`

Production URL:

```text
https://it-festival-2026.vercel.app
```

Custom domain:

```text
https://tugasvibecodingpolsri.mooncrust.my.id
```

Konfigurasi DNS:

```text
Host Name   : tugasvibecodingpolsri
Record Type : CNAME
Address     : 01534b73e689bcec.vercel-dns-017.com
```

### 4.8 Perintah Deploy Ulang

```powershell
# Jalankan dari folder proyek tugaspolsri2026.
npx.cmd vercel@latest --prod
```

### 4.9 Rencana GitHub Repository

Nama repo yang disarankan:

```text
tugaspolsri2026
```

Isi repo:

1. `index.html`.
2. `PROJECT_PLAN_PRD_TRD_DRD.md`.
3. `verification/` jika ingin menyertakan bukti QA.
4. `verify.cjs` jika ingin menyertakan script pengujian.
5. `.gitignore`.
6. Seluruh gambar Belibit, logo, dan folder `assets/events/`.
7. `package.json` dan `package-lock.json` untuk server lokal dan Playwright.

### 4.10 Aset Gambar dan Verifikasi

Latar hero memakai `assets/hero/ampera-palembang.png`, yaitu ilustrasi Ampera yang sebelumnya tertanam dalam HTML dan kini disimpan sebagai file lokal.

Logo navbar dan favicon menggunakan `belida.jpg`. Referensi awal karakter disimpan di `cyberbelida.jpg`. Empat PNG Belibit di folder utama menampilkan pose Siap Tempur, Cyber Coder, Trophy Belida, dan Retro Gamer.

Tujuh sampul acara menggunakan WebP lokal pada `assets/events/`: `mlbb`, `ff`, `vibe`, `ctf`, `photo`, `training-vibe`, dan `training-cyber`. Pemetaan gambar dan teks alternatif ada pada `EVENT_ART`. Fungsi `renderEventCover()` menampilkan ilustrasi yang sama pada kartu dan detail acara. PNG asli ketujuh ilustrasi disimpan di `assets/events/source/`, dan prompt ilustrasi tersedia di `assets/events/PROMPTS.md`. Aset aktif, versi asli, dan referensi terkait tetap disertakan di folder proyek.

Jalankan `npm.cmd install`, kemudian `npm.cmd start` untuk server lokal pada http://127.0.0.1:4174. Website juga bisa dibuka melalui `index.html`.

Jalankan `npm.cmd run verify` untuk memeriksa gambar, routing, akun, pendaftaran, tiket, dan tampilan responsif. Script memakai Playwright dari dependensi proyek dan Google Chrome, serta menemukan `index.html` melalui `__dirname`. Hasil terbaru tersimpan di `verification/`.
