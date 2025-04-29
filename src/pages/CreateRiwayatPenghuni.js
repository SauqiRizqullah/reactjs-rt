import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateRiwayatPenghuni() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rumah_id: '',
    penghuni_id: '',
    tanggal_masuk: '',
    tanggal_keluar: '',
  });

  const [rumahList, setRumahList] = useState([]);
  const [penghuniList, setPenghuniList] = useState([]);

  useEffect(() => {
    // Fetch daftar rumah
    fetch("http://127.0.0.1:8000/api/rumah")
      .then((res) => res.json())
      .then((data) => setRumahList(data))
      .catch((err) => console.error("Error fetching rumah:", err));

    // Fetch daftar penghuni
    fetch("http://127.0.0.1:8000/api/penghunis")
      .then((res) => res.json())
      .then((data) => setPenghuniList(data))
      .catch((err) => console.error("Error fetching penghuni:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/riwayat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Riwayat berhasil ditambahkan!");
        navigate("/"); // Balik ke Home
      } else {
        const errorData = await response.json();
        console.error("Gagal tambah riwayat:", errorData);
        alert("Gagal menambahkan riwayat.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tambah Riwayat Penghuni</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="rumah_id"
          value={formData.rumah_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Pilih Rumah</option>
          {rumahList.map((rumah) => (
            <option key={rumah.id} value={rumah.id}>
              {rumah.nomor_rumah}
            </option>
          ))}
        </select>

        <select
          name="penghuni_id"
          value={formData.penghuni_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Pilih Penghuni</option>
          {penghuniList.map((penghuni) => (
            <option key={penghuni.id} value={penghuni.id}>
              {penghuni.nama}
            </option>
          ))}
        </select>

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
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        >
          Simpan Riwayat
        </button>
      </form>
    </div>
  );
}

export default CreateRiwayatPenghuni;
