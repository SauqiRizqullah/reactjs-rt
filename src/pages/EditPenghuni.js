import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithCsrf } from '../api/fetchWithCsrf';

function EditPenghuni() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    status: 'tetap',
    no_telepon: '',
    menikah: false,
    foto_ktp: null,
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/penghunis/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          nama: data.nama,
          status: data.status,
          no_telepon: data.no_telepon,
          menikah: data.menikah === 1, // asumsi menikah 1 = true, 0 = false
          foto_ktp: null, // foto ktp tidak dimuat di awal, karena upload baru saja
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('nama', formData.nama);
    payload.append('status', formData.status);
    payload.append('no_telepon', formData.no_telepon);
    payload.append('menikah', formData.menikah ? 1 : 0);

    if (formData.foto_ktp) {
      payload.append('foto_ktp', formData.foto_ktp);
    }

    payload.append('_method', 'PUT'); // method spoofing

    try {
      const response = await fetchWithCsrf(`http://127.0.0.1:8000/api/penghunis/${id}`, {
        method: 'POST', // tetap POST karena pakai FormData
        body: payload,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data berhasil diperbarui:', result);
        alert('Data berhasil diperbarui!');
        navigate('/penghuni');
      } else {
        const errorData = await response.json();
        console.error('Gagal memperbarui:', errorData);
        alert('Gagal memperbarui data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memperbarui.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Penghuni</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Nama"
          className="border p-2 rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="tetap">Tetap</option>
          <option value="kontrak">Kontrak</option>
        </select>
        <input
          type="text"
          name="no_telepon"
          value={formData.no_telepon}
          onChange={handleChange}
          placeholder="No Telepon"
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="menikah"
            checked={formData.menikah}
            onChange={handleChange}
          />
          Menikah
        </label>
        <input
          type="file"
          name="foto_ktp"
          onChange={handleChange}
          className="border p-2 rounded"
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default EditPenghuni;
