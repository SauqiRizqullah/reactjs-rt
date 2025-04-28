// src/pages/Rumah.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rumah() {
  const [rumahs, setRumahs] = useState([]);
  const [penghunis, setPenghunis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRumahs();
    fetchPenghunis();
  }, []);

  const fetchRumahs = () => {
    fetch("http://127.0.0.1:8000/api/rumah")
      .then((response) => response.json())
      .then((data) => setRumahs(data))
      .catch((error) => console.error("Error fetching rumahs:", error));
  };

  const fetchPenghunis = () => {
    fetch("http://127.0.0.1:8000/api/penghunis")
      .then((response) => response.json())
      .then((data) => setPenghunis(data))
      .catch((error) => console.error("Error fetching penghunis:", error));
  };

  const getPenghuniName = (currentPenghuniId) => {
    if (!currentPenghuniId) return "-";
    const penghuni = penghunis.find((p) => p.id === currentPenghuniId);
    return penghuni ? penghuni.nama : "Tidak ditemukan";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Daftar Rumah
        </h1>

        <div className="text-right mb-4">
          <button
            onClick={() => navigate("/create-rumah")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            + Tambah Rumah
          </button>
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID Rumah</th>
              <th className="px-4 py-2 border">Nomor Rumah</th>
              <th className="px-4 py-2 border">Status Rumah</th>
              <th className="px-4 py-2 border">Nama Penghuni</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rumahs.map((rumah) => (
              <tr key={rumah.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{rumah.id}</td>
                <td className="px-4 py-2 border text-center">{rumah.nomor_rumah}</td>
                <td className="px-4 py-2 border text-center">{rumah.current_penghuni_id ? "Dihuni" : "Tidak Dihuni"}</td>
                <td className="px-4 py-2 border text-center">
                  {getPenghuniName(rumah.current_penghuni_id)}
                </td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    onClick={() => navigate(`/edit-rumah/${rumah.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Rumah;
