import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CreatePenghuni from "./pages/CreatePenghuni";
import EditRiwayatPenghuni from "./pages/EditRiwayatPenghuni";
import Penghuni from "./pages/Penghuni"; 
import EditPenghuni from "./pages/EditPenghuni"; 
import Rumah from "./pages/Rumah";
import CreateRumah from "./pages/CreateRumah";
import EditRumah from "./pages/EditRumah";

function Home() {
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/riwayat")
      .then((response) => response.json())
      .then((data) => setRiwayat(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
                  onClick={() => navigate("/edit-riwayat/:id")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded mr-2">
                    Edit
                  </button>
                  <button 
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center flex justify-center gap-6">
          <button
            onClick={() => navigate("/create-penghuni")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            + Tambah Penghuni
          </button>
          <button
            onClick={() => navigate("/edit-penghuni")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md"
          >
            + Edit Penghuni
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
        <Route path="/create-penghuni" element={<CreatePenghuni />} />
        <Route path="/edit-penghuni/:id" element={<EditPenghuni />} />
        <Route path="/edit-riwayat/:id" element={<EditRiwayatPenghuni />} /> {/* <-- Tambahkan ini */}
        <Route path="/penghuni" element={<Penghuni />} /> {/* <== Tambahkan ini */}
        <Route path="/rumah" element={<Rumah />} />
        <Route path="/edit-rumah/:id" element={<EditRumah/>}/>
        <Route path="/create-rumah" element={<CreateRumah />} />
      </Routes>
    </Router>
  );
}
