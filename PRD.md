# PRD - Product Requirements Document

Versi dokumen: 21 September 2026, sesuai implementasi lokal terbaru.

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
