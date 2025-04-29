import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatePengeluaran() {
  const [form, setForm] = useState({
    nama_pengeluaran: "",
    jumlah: "",
    bulan: "",
    tahun: "",
    tanggal_pengeluaran: "",
    deskripsi: "",
  });
  const [totalKas, setTotalKas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/total-kas")
      .then((response) => response.json())
      .then((data) => setTotalKas(data.total_kas));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(form.jumlah) > totalKas) {
      alert("Jumlah pengeluaran melebihi kas yang tersedia!");
      return;
    }

    fetch("http://127.0.0.1:8000/api/pengeluaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        navigate("/pengeluaran");
      })
      .catch((error) => console.error("Gagal menyimpan:", error));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Tambah Pengeluaran</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_pengeluaran"
            placeholder="Nama Pengeluaran"
            value={form.nama_pengeluaran}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="jumlah"
            placeholder="Jumlah"
            value={form.jumlah}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="bulan"
            placeholder="Bulan"
            value={form.bulan}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="tahun"
            placeholder="Tahun"
            value={form.tahun}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
  type="date"
  name="tanggal_pengeluaran"
  value={form.tanggal_pengeluaran || ""}
  onChange={handleChange}
  className="input-style"
/>
          <textarea
            name="deskripsi"
            placeholder="Deskripsi (opsional)"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded w-full"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePengeluaran;
