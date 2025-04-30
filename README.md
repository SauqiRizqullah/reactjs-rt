# 🌐 Frontend (React)

## ✅ Langkah Instalasi

1. **Clone project**
   ```bash
   git clone https://github.com/SauqiRizqullah/reactjs-rt.git
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```
   Semua modul seperti `react-router-dom`, `chart.js`, dan `react-chartjs-2` akan otomatis ter-install jika sudah didefinisikan di `package.json`.

3. **(Opsional) Jika TailwindCSS belum aktif**
   Jika project belum dikonfigurasi Tailwind, jalankan:
   ```bash
   npm install -D tailwindcss@^3 postcss autoprefixer
   npx tailwindcss init -p
   ```
   Dan pastikan file konfigurasi `tailwind.config.js` serta `index.css` sudah disesuaikan.

4. **Jalankan project**
   ```bash
   npm start
   ```