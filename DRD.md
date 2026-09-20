# DRD - Design Requirements Document

Versi dokumen: 21 September 2026, sesuai implementasi lokal terbaru.

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
