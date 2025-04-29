import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CreatePenghuni from "./pages/CreatePenghuni";
import EditRiwayatPenghuni from "./pages/EditRiwayatPenghuni";
import Penghuni from "./pages/Penghuni"; 
import EditPenghuni from "./pages/EditPenghuni"; 
import Rumah from "./pages/Rumah";
import CreateRumah from "./pages/CreateRumah";
import EditRumah from "./pages/EditRumah";
import CreateRiwayatPenghuni from "./pages/CreateRiwayatPenghuni";
import Pembayaran from "./pages/Pembayaran";
import CreatePembayaran from "./pages/CreatePembayaran";
import EditPembayaran from "./pages/EditPembayaran";
import Pengeluaran from "./pages/Pengeluaran";
import CreatePengeluaran from "./pages/CreatePengeluaran";
import EditPengeluaran from "./pages/EditPengeluaran";

function Home() {
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/riwayat")
      .then((response) => response.json())
      .then((data) => setRiwayat(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/riwayat/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Data berhasil dihapus!');
        setRiwayat((prev) => prev.filter((item) => item.id !== id)); // Hapus dari list state
      } else {
        const errorData = await response.json();
        console.error('Gagal hapus:', errorData);
        alert('Gagal menghapus data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Riwayat Penghuni Rumah
        </h1>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">ID Rumah</th>
              <th className="px-4 py-2 border">ID Penghuni</th>
              <th className="px-4 py-2 border">Tanggal Masuk</th>
              <th className="px-4 py-2 border">Tanggal Keluar</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{item.id}</td>
                <td className="px-4 py-2 border text-center">{item.rumah_id}</td>
                <td className="px-4 py-2 border text-center">{item.penghuni_id}</td>
                <td className="px-4 py-2 border text-center">{item.tanggal_masuk}</td>
                <td className="px-4 py-2 border text-center">{item.tanggal_keluar || '-'}</td>
                <td className="px-4 py-2 border text-center">
                <button 
  onClick={() => navigate(`/edit-riwayat/${item.id}`)}
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded mr-2"
>
                    Edit
                  </button>
                  <button 
  onClick={() => handleDelete(item.id)}
  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
>
  Delete
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center flex justify-center gap-6">
          <button
            onClick={() => navigate("/create-riwayat")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            + Tambah Riwayat Penghuni
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-riwayat" element={<CreateRiwayatPenghuni />} />
        <Route path="/create-penghuni" element={<CreatePenghuni />} />
        <Route path="/edit-penghuni/:id" element={<EditPenghuni />} />
        <Route path="/edit-riwayat/:id" element={<EditRiwayatPenghuni />} />
        <Route path="/penghuni" element={<Penghuni />} /> 
        <Route path="/rumah" element={<Rumah />} />
        <Route path="/edit-rumah/:id" element={<EditRumah/>}/>
        <Route path="/create-rumah" element={<CreateRumah />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/create-pembayaran" element={<CreatePembayaran />} />
        <Route path="/edit-pembayaran/:id" element={<EditPembayaran />} />
        <Route path="/pengeluaran" element={<Pengeluaran />} />
        <Route path="/create-pengeluaran" element={<CreatePengeluaran />} />
        <Route path="/edit-pengeluaran/:id" element={<EditPengeluaran />} />  
      </Routes>
    </Router>
  );
}
