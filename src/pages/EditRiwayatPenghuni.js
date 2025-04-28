import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRiwayatPenghuni() {
  const { id } = useParams(); // <-- Ambil ID dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rumah_id: '',
    penghuni_id: '',
    tanggal_masuk: '',
    tanggal_keluar: '',
  });

  useEffect(() => {
    // Fetch data riwayat berdasarkan ID
    fetch(`http://127.0.0.1:8000/api/riwayat/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          rumah_id: data.rumah_id,
          penghuni_id: data.penghuni_id,
          tanggal_masuk: data.tanggal_masuk,
          tanggal_keluar: data.tanggal_keluar || '',
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/riwayat/${id}`, {
        method: 'PUT', // <-- Pakai PUT untuk update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data berhasil diperbarui!');
        navigate('/'); // <-- Setelah sukses, balik ke Home
      } else {
        const errorData = await response.json();
        console.error('Gagal update:', errorData);
        alert('Gagal memperbarui data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Riwayat Penghuni</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="rumah_id"
          value={formData.rumah_id}
          onChange={handleChange}
          placeholder="ID Rumah"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="penghuni_id"
          value={formData.penghuni_id}
          onChange={handleChange}
          placeholder="ID Penghuni"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="tanggal_masuk"
          value={formData.tanggal_masuk}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="tanggal_keluar"
          value={formData.tanggal_keluar}
          onChange={handleChange}
          className="border p-2 rounded"
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

export default EditRiwayatPenghuni;
