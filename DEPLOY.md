# Paket Deploy Final — SMK Tunas Media

## Pilihan paling mudah: Render
1. Upload folder ini ke GitHub sebagai repository baru.
2. Di Render pilih **New → Web Service** lalu hubungkan repository.
3. Render akan membaca `render.yaml` bila Blueprint digunakan.
4. Environment wajib:
   - `NODE_ENV=production`
   - `VITE_DEMO_MODE=true`
   - `AUTH_USERNAME=SMK Tunas Media`
   - `AUTH_PASSWORD=Bissmillah` (ganti sebelum dipakai sungguhan)
5. Opsional: `GEMINI_API_KEY` untuk fitur AI.
6. Health check: `/api/health`.

## Docker / Railway
Image sudah disiapkan melalui `Dockerfile`. Port mengikuti `PORT` dan default 3000.

## Demo vs produksi
`VITE_DEMO_MODE=true` membuat data akademik tersimpan di localStorage browser dan tidak membaca/menulis database Firebase sumber.

Untuk produksi multi-user, jangan hanya memakai localStorage. Buat Firebase project milik SMK Tunas Media sendiri, isi environment `VITE_FIREBASE_*`, lalu set `VITE_DEMO_MODE=false` dan terapkan `firestore.rules` pada project tersebut.

## Login demo
- Username: `SMK Tunas Media`
- Password: `Bissmillah`

Segera ganti password melalui environment hosting sebelum aplikasi dibagikan ke publik.

## Kredensial Login Dinamis
Username dan password dapat diganti langsung dari menu **Pengaturan → Akses Kredensial Akun**. Setelah tombol **Simpan & Aktifkan Kredensial** ditekan, server langsung memakai kredensial baru untuk login berikutnya.

- Demo/local mode: kredensial aktif disimpan pada runtime server di `data/auth-credentials.json`.
- Firebase mode: kredensial juga dicoba disinkronkan ke dokumen `pengaturan/config`.
- Untuk deployment multi-instance, gunakan Firebase/shared persistent storage agar semua instance melihat kredensial yang sama.
