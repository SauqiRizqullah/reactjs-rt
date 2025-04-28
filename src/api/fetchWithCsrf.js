// src/api/fetchWithCsrf.js

// Ambil CSRF token dari meta tag saat pertama kali
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// Fungsi fetch yang otomatis menyertakan CSRF Token
export async function fetchWithCsrf(url, options = {}) {
  const defaultHeaders = {
    'X-CSRF-TOKEN': csrfToken,
  };

  // Jika body bertipe JSON, tambahkan Content-Type header
  if (options.body && !(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body); // ubah body ke JSON string
  }

  const finalOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...defaultHeaders,
    },
  };

  return fetch(url, finalOptions);
}
