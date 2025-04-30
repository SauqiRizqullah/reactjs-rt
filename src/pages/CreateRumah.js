// src/pages/CreateRumah.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateRumah() {
  const [formData, setFormData] = useState({
    nomor_rumah: "",
    status_rumah: "dihuni",
    current_penghuni_id: "",
  });

  const [penghuniList, setPenghuniList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch daftar penghuni
    const fetchPenghuni = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/penghunis");
        if (response.ok) {
          const data = await response.json();
          setPenghuniList(data);
        } else {
          console.error("Gagal mengambil data penghuni");
        }
      } catch (error) {
        console.error("Error saat fetch penghuni:", error);
      }
    };

    fetchPenghuni();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/rumah", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Rumah berhasil ditambahkan!");
        navigate("/rumah");
      } else {
        alert("Gagal menambahkan rumah.");
      }
    } catch (error) {
      console.error("Error creating rumah:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Rumah</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nomor_rumah"
          value={formData.nomor_rumah}
          onChange={handleChange}
          placeholder="Nomor Rumah"
          className="border p-2 rounded"
          required
        />

        <select
          name="current_penghuni_id"
          value={formData.current_penghuni_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">-- Pilih Penghuni (opsional) --</option>
          {penghuniList.map((penghuni) => (
            <option key={penghuni.id} value={penghuni.id}>
              {penghuni.nama}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreateRumah;
