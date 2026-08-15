# 🏫 SMK Tunas Media — Aplikasi Sekolah

Aplikasi sekolah berbasis React + Vite yang disiapkan untuk **GitHub Pages** dan mode demo local-first.

## 🌐 Link aplikasi

Setelah workflow GitHub Pages berhasil:

**https://ans-surya.github.io/SMK-Tunas-Media/**

## 🔐 Login awal

- **Username:** `SMK Tunas Media`
- **Password:** `Bissmillah`

Username dan password dapat diubah dari menu **Pengaturan → Akses Kredensial Akun**. Pada GitHub Pages, kredensial baru disimpan di browser yang digunakan.

## 🚀 Deployment GitHub Pages

**Pengguna tidak perlu menjalankan `npm install` atau `npm run dev`.**

1. Pastikan source berada di branch `main`.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
4. Push perubahan ke `main`.
5. GitHub Actions akan otomatis menjalankan build Vite dan menerbitkan folder `dist`.
6. Setelah workflow selesai, buka URL aplikasi di atas.

Workflow deployment tersedia di:

`.github/workflows/deploy-pages.yml`

## 🧩 Fitur utama

- Dashboard sekolah
- Kelola siswa
- Kelola mata pelajaran
- Jadwal mengajar
- Absensi
- Penilaian
- Agenda mengajar
- Bimbingan wali
- Cetak kartu QR
- Pusat laporan
- Perangkat ajar
- Generator AI
- Modul Ajar AI
- Asisten Guru AI
- Generator LKPD AI
- Pengaturan profil sekolah
- Penggantian username/password
- Mode demo local-first

## ⚠️ Batasan GitHub Pages

GitHub Pages hanya menjalankan frontend statis. File `server.ts` dan endpoint `/api/*` tidak dijalankan oleh GitHub Pages.

Karena itu:

- Data demo disimpan di `localStorage` browser.
- Login GitHub Pages menggunakan kredensial lokal browser.
- Fitur AI yang membutuhkan server/API memerlukan deployment server seperti Render.
- Untuk database bersama multi-user, gunakan Firebase project milik SMK Tunas Media sendiri.

## 🖥️ Deployment server penuh

Untuk versi yang menjalankan `server.ts`, gunakan konfigurasi Web Service/Node/Docker yang tersedia di `render.yaml` dan `Dockerfile`.
