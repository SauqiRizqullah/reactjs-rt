// src/pages/Penghuni.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Penghuni() {
  const [penghunis, setPenghunis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/penghunis")
      .then((response) => response.json())
      .then((data) => setPenghunis(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Daftar Penghuni
        </h1>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">No. Telepon</th>
              <th className="px-4 py-2 border">Aksi</th> {/* kolom baru */}
            </tr>
          </thead>
          <tbody>
            {penghunis.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{item.id}</td>
                <td className="px-4 py-2 border text-center">{item.nama}</td>
                <td className="px-4 py-2 border text-center">{item.no_telepon}</td>
                <td className="px-4 py-2 border text-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded mr-2"
                    onClick={() => navigate(`/edit-penghuni/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                    onClick={() => handleDelete(item.id)}
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
            onClick={() => navigate("/create-penghuni")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            + Tambah Penghuni
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            ⬅️ Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );

  // function untuk handle delete
  function handleDelete(id) {
    if (window.confirm("Apakah kamu yakin ingin menghapus penghuni ini?")) {
      fetch(`http://127.0.0.1:8000/api/penghunis/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Setelah delete berhasil, refresh data
            setPenghunis(penghunis.filter(p => p.id !== id));
          } else {
            throw new Error("Gagal menghapus data");
          }
        })
        .catch((error) => console.error("Error deleting data:", error));
    }
  }
}

export default Penghuni;
