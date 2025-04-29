import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPengeluaran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_pengeluaran: "",
    jumlah: "",
    bulan: "",
    tahun: "",
    deskripsi: "",
  });
  const [totalKas, setTotalKas] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pengeluaran/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setForm({
          nama_pengeluaran: data.nama_pengeluaran,
          jumlah: data.jumlah,
          bulan: data.bulan,
          tahun: data.tahun,
          deskripsi: data.deskripsi || "",
        });
      });

    fetch("http://127.0.0.1:8000/api/total-kas")
      .then((response) => response.json())
      .then((data) => setTotalKas(data.total_kas));
  }, [id]);

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

    fetch(`http://127.0.0.1:8000/api/pengeluaran/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        navigate("/pengeluaran");
      })
      .catch((error) => console.error("Gagal update:", error));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Pengeluaran</h1>
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
          <textarea
            name="deskripsi"
            placeholder="Deskripsi (opsional)"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPengeluaran;
