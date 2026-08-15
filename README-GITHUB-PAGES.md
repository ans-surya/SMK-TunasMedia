# SMK Tunas Media — GitHub Pages

Versi ini disiapkan khusus untuk GitHub Pages. Pengguna **tidak perlu menjalankan `npm install` atau `npm run dev`**.

## URL aplikasi

Setelah GitHub Pages aktif melalui GitHub Actions:

`https://ans-surya.github.io/SMK-Tunas-Media/`

## Login awal

- Username: `SMK Tunas Media`
- Password: `Bissmillah`

Pada GitHub Pages, login dan data demo berjalan secara lokal di browser (`localStorage`). Perubahan username/password dari menu Pengaturan aktif pada browser tersebut.

## Cara deploy

1. Upload seluruh isi folder ini ke repository `ans-surya/SMK-Tunas-Media` pada branch `main`.
2. Buka **Settings → Pages** di GitHub.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions** (bukan Deploy from a branch).
4. Push/commit source. Workflow `.github/workflows/deploy-pages.yml` akan menjalankan `npm install`, `npm run build:web`, lalu mengunggah folder `dist` ke Pages.
5. Setelah workflow berhasil, buka URL aplikasi.

## Penting

GitHub Pages tidak menjalankan `server.ts`. Karena itu endpoint `/api/auth/*` dan `/api/ai/*` tidak tersedia di hosting ini. Fitur data demo tetap menggunakan localStorage; fitur AI yang memerlukan server/API memerlukan deployment server seperti Render.
