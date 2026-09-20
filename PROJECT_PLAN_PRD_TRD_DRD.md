# IT-FESTIVAL 2026 SPA - Flow Planning, PRD, TRD, dan DRD

Versi dokumen: 21 September 2026, sesuai implementasi lokal terbaru.

Dokumen ini menggabungkan flow planning, Product Requirements Document (PRD), Technical Requirements Document (TRD), dan Design Requirements Document (DRD) untuk proyek tugas `tugaspolsri2026`.

## 1. Ringkasan Proyek

Nama proyek: IT-FESTIVAL 2026

Institusi: Jurusan Manajemen Informatika, Politeknik Negeri Sriwijaya (POLSRI)

Jenis aplikasi: Single Page Application (SPA) statis berbasis satu file `index.html`

Target deployment: Vercel dengan custom domain `tugasvibecodingpolsri.mooncrust.my.id`

Tujuan utama: Membuat website event IT-FESTIVAL 2026 yang memiliki halaman landing, autentikasi, katalog event, pendaftaran, konfirmasi, dashboard, dan e-ticket berbasis localStorage.

## 2. Flow Planning

### 2.1 Alur Pengguna Utama

1. Pengguna membuka landing page.
2. Pengguna melihat headline, countdown, maskot, highlight event, dan informasi sekretariat.
3. Pengguna memilih tombol `Jelajahi Event` atau `Daftar Sekarang`.
4. Pengguna membuka katalog event.
5. Pengguna memfilter event berdasarkan kategori: Semua, Kompetisi, Pelatihan, atau Seminar.
6. Pengguna membuka detail event.
7. Jika belum login, pengguna diarahkan ke modal login/register.
8. Pengguna register atau login.
9. Pengguna masuk ke dashboard.
10. Pengguna memilih event yang ingin didaftarkan.
11. Pengguna mengisi form pendaftaran.
12. Pengguna memeriksa ulang data di halaman konfirmasi.
13. Sistem menerbitkan e-ticket lokal.
14. Pengguna dapat mencetak tiket atau kembali ke dashboard.

### 2.2 Alur Routing SPA

1. `#landing` - halaman pembuka.
2. `#events` - katalog semua event.
3. `#events/kompetisi` - katalog event kompetisi.
4. `#events/pelatihan` - katalog event pelatihan.
5. `#events/seminar` - katalog event seminar.
6. `#event/{eventId}` - detail event.
7. `#register/{eventId}` - form pendaftaran.
8. `#confirm` - konfirmasi data sebelum tiket dibuat.
9. `#dashboard` - dashboard pengguna.
10. `#ticket/{registrationId}` - status pendaftaran dan e-ticket.

### 2.3 Alur Autentikasi

1. Sistem mengecek `localStorage['itfest_currentUser']`.
2. Jika belum ada sesi aktif, navbar menampilkan tombol login/register.
3. Jika pengguna register, data user disimpan ke `localStorage['itfest_users']`.
4. Password disimpan menggunakan hash dan salt melalui WebCrypto.
5. Setelah login/register berhasil, sesi aktif disimpan ke `localStorage['itfest_currentUser']`.
6. Navbar berubah menampilkan avatar user dan tombol logout.
7. Logout menghapus sesi aktif dari localStorage.

### 2.4 Alur Pendaftaran Event

1. Pengguna memilih event.
2. Sistem membaca tipe event: solo atau team.
3. Form menyesuaikan field berdasarkan tipe event.
4. Pengguna mengisi data peserta, instansi, WhatsApp, link kartu identitas, dan bukti pembayaran jika ada.
5. Sistem melakukan validasi field wajib.
6. Data sementara dikirim ke halaman konfirmasi.
7. Setelah konfirmasi, sistem membuat ID tiket unik.
8. Data pendaftaran disimpan ke `localStorage['itfest_registrations']`.
9. Pengguna diarahkan ke e-ticket.

## 3. PRD - Product Requirements Document

### 3.1 Latar Belakang

IT-FESTIVAL 2026 membutuhkan website event yang dapat menampilkan informasi resmi, daftar kompetisi, pelatihan, seminar, serta simulasi pendaftaran peserta. Proyek dibuat sebagai aplikasi frontend mandiri agar mudah dibuka lokal, dipresentasikan, dan dideploy ke Vercel tanpa backend.

### 3.2 Tujuan Produk

1. Menyediakan website event interaktif untuk IT-FESTIVAL 2026.
2. Menampilkan 9 item event resmi dalam satu katalog.
3. Menyediakan pengalaman pendaftaran end-to-end dari pemilihan event sampai e-ticket.
4. Menyediakan sistem login/register lokal untuk simulasi akun peserta.
5. Menampilkan identitas visual retro 16-bit neo-brutalist cyberpunk.
6. Memastikan website responsif di desktop dan mobile.

### 3.3 Target Pengguna

1. Mahasiswa POLSRI.
2. Siswa SMA/SMK sederajat.
3. Peserta umum yang mengikuti seminar, pelatihan, atau lomba.
4. Panitia yang ingin mempresentasikan prototype website event.
5. Dosen atau penguji tugas yang menilai alur website.

### 3.4 Fitur Utama

1. Landing page dengan countdown event.
2. Showcase empat ilustrasi Belibit: Siap Tempur, Cyber Coder, Trophy Belida, dan Retro Gamer.
3. Katalog 9 event autentik.
4. Filter kategori event.
5. Detail event dengan tab deskripsi, syarat, dan benefit.
6. Modal login/register.
7. Dashboard pengguna.
8. Form pendaftaran dinamis untuk solo dan team.
9. Konfirmasi data.
10. E-ticket dengan ID unik dan status aktif.
11. Cetak tiket melalui `window.print()`.
12. Penyimpanan data lokal dengan localStorage.
13. Latar Ampera, logo, pose maskot, ilustrasi acara, dan gambar referensi terkait tersedia sebagai file lokal.
14. Logo Belida lokal serta tujuh ilustrasi bertema pada kartu dan detail kompetisi/pelatihan.
15. Strip informasi menampilkan `16 SEP - 30 OKT 2026`. Tulisan kecil di bawah logo menampilkan `POLITEKNIK NEGERI SRIWIJAYA`.

### 3.5 Data Event

Kategori kompetisi:

1. Mobile Legends: Bang Bang.
2. Free Fire.
3. Vibe Coding Competition.
4. Capture The Flag Competition.
5. Photography Competition.

Kategori pelatihan:

1. Pelatihan Vibe Coding: AI-Powered Software Engineering.
2. Pelatihan Cyber Security: Defense & Vulnerability Assessment.

Kategori seminar:

1. Guest Star Avip Syaifulloh, S.T.
2. Keynote Speaker Rahmi Liza, S.Tr.Kom., M.Sc.

### 3.6 Kebutuhan Bisnis

1. Website dapat dibuka tanpa proses instalasi.
2. Website dapat dipublish menggunakan Vercel.
3. Website dapat dihubungkan ke subdomain custom.
4. Data pendaftaran tidak memerlukan backend.
5. Alur user terlihat lengkap untuk kebutuhan demonstrasi tugas.

### 3.7 Batasan Produk

1. Tiket yang dihasilkan adalah tiket simulasi lokal.
2. Data peserta tersimpan di browser pengguna, bukan database server.
3. Tidak ada payment gateway.
4. Tidak ada dashboard admin.
5. Link PDF CV speaker hanya dapat berjalan jika file tersedia di folder yang sesuai.

## 4. TRD - Technical Requirements Document

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

## 5. DRD - Design Requirements Document

### 5.1 Konsep Visual

Tema desain: Neo-brutalist 16-bit retro pixel art dengan nuansa cyberpunk.

Identitas visual:

1. Warna gelap cyber navy sebagai background.
2. Aksen neon cyan, pink, kuning, dan emerald.
3. Border tebal hitam.
4. Shadow keras tanpa blur.
5. Tipografi pixel untuk headline.
6. Layout card tegas dan responsif.

### 5.2 Palet Warna

```text
Cyber Navy     : #040612
Dark Navy      : #070a1e
Cyber Yellow   : #FFE600
Neon Pink      : #FF2E93
Electric Cyan  : #00F0FF
Ink Border     : #050718
Off White      : #F5F1E0
Emerald Green  : #10B981
```

### 5.3 Tipografi

1. Header pixel: `Press Start 2P`.
2. Subheading dan judul kartu: `Pixelify Sans`.
3. Body, data teknis, dan kode: `Space Mono`.

### 5.4 Komponen UI

Komponen utama:

1. Navbar sticky. Strip informasi menampilkan `16 SEP - 30 OKT 2026`. Tulisan kecil di bawah logo menampilkan `POLITEKNIK NEGERI SRIWIJAYA`.
2. Hero section dengan ilustrasi Ampera pixel art dari `assets/hero/ampera-palembang.png`.
3. Countdown timer.
4. Card maskot.
5. Card event.
6. Filter tabs.
7. Modal auth.
8. Dashboard stats.
9. Form pendaftaran.
10. Confirmation card.
11. E-ticket pass.
12. Footer sekretariat.

### 5.5 Aturan Neo-Brutalist

1. Semua card memakai border solid 3px atau 4px.
2. Shadow menggunakan hard-edge tanpa blur.
3. Tombol memiliki pressed state.
4. Tidak memakai efek blur lembut untuk elevasi.
5. Kontras warna harus kuat.
6. Setiap CTA harus jelas dan mudah diklik.

### 5.6 Responsiveness

Breakpoint dan perilaku:

1. Mobile: navbar ringkas, kartu event satu kolom, maskot dua kolom, tombol wrap.
2. Tablet: grid dua kolom untuk event dan maskot.
3. Desktop: kompetisi tiga kolom, pelatihan dua kolom, dan galeri maskot empat kolom.
4. Ticket tetap terbaca di layar kecil.
5. Form input tidak boleh overflow.

### 5.7 Identitas Belibit dan Sampul Acara

Empat pose maskot memakai ilustrasi raster cyber Belida, dengan visor, headset, tubuh perak, dan aksen neon yang konsisten. Logo lokal juga tampil sebagai favicon dan identitas navbar.

Setiap kompetisi memiliki latar sesuai tema: arena MOBA untuk MLBB, pulau battle royale untuk Free Fire, meja pengembangan aplikasi untuk Vibe Coding, arena terminal dan bendera untuk CTF, serta kamera dan kehidupan kampus untuk fotografi. Dua pelatihan menampilkan Belibit sebagai instruktur coding dan keamanan jaringan.

Sampul menggunakan rasio 3:2 dengan dimensi stabil. Label peserta berada di sudut gambar; judul, jadwal, dan tombol tetap terpisah agar terbaca. Gambar dapat diklik menuju detail acara. Detail menampilkan ilustrasi lengkap, dan animasi mengikuti preferensi reduced motion.

## 6. Acceptance Criteria

Produk dianggap selesai jika:

1. Website dapat dibuka dari `index.html`.
2. Website dapat diakses dari domain Vercel.
3. Semua 8 view SPA berfungsi.
4. Login demo berhasil.
5. Register user baru berhasil.
6. Katalog menampilkan 9 event.
7. Filter kategori berjalan.
8. Detail event terbuka sesuai event yang dipilih.
9. Form pendaftaran menyesuaikan event solo atau team.
10. Konfirmasi data dapat diedit.
11. E-ticket berhasil diterbitkan.
12. Dashboard menampilkan pendaftaran milik user aktif.
13. Logout bekerja.
14. Tampilan responsif di mobile dan desktop.

## 7. Akun Demo

```text
Email    : demo@itfest.id
Password : password123
```

## 8. Catatan Untuk Repository GitHub

Deskripsi repo yang disarankan:

```text
Single Page Application IT-FESTIVAL 2026 POLSRI dengan tema neo-brutalist retro pixel art, katalog event, login lokal, pendaftaran, dashboard, dan e-ticket.
```

Topik repo yang disarankan:

```text
html
css
javascript
tailwindcss
vercel
polsri
it-festival
spa
localstorage
neo-brutalist
```

Petunjuk menjalankan dan memeriksa versi terbaru tersedia di `README.md`.
