import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [totalKas, setTotalKas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pengeluaran")
      .then((response) => response.json())
      .then((data) => setPengeluaran(data));

    fetch("http://127.0.0.1:8000/api/total-kas")
      .then((response) => response.json())
      .then((data) => setTotalKas(data.total_kas));
  }, []);

  function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Yakin ingin menghapus pengeluaran ini?")) {
      fetch(`http://127.0.0.1:8000/api/pengeluaran/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setPengeluaran(pengeluaran.filter((item) => item.id !== id));
        })
        .catch((error) => console.error("Gagal hapus:", error));
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Data Pengeluaran</h1>
        <div className="bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Total Kas: Rp{totalKas.toLocaleString()}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nama Pengeluaran</th>
              <th className="border px-4 py-2">Jumlah</th>
              <th className="border px-4 py-2">Bulan</th>
              <th className="border px-4 py-2">Tahun</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengeluaran.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.nama_pengeluaran}</td>
                <td className="border px-4 py-2">Rp{item.jumlah.toLocaleString()}</td>
                <td className="border px-4 py-2">{item.bulan}</td>
                <td className="border px-4 py-2">{item.tahun}</td>
                <td className="border px-4 py-2">{item.deskripsi || '-'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/edit-pengeluaran/${item.id}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/create-pengeluaran")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            + Tambah Pengeluaran
          </button>
        </div>
      </div>
    </div>
  );

  
}

export default Pengeluaran;
