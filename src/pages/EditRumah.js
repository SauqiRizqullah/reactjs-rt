// src/pages/EditRumah.js

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRumah() {
  const [formData, setFormData] = useState({
    nomor_rumah: "",
    status_rumah: "dihuni",
    current_penghuni_id: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/rumah/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching rumah:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/rumah/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Rumah berhasil diperbarui!");
        navigate("/rumah");
      } else {
        alert("Gagal memperbarui rumah.");
      }
    } catch (error) {
      console.error("Error updating rumah:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Rumah</h1>
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

        <input
          type="number"
          name="current_penghuni_id"
          value={formData.current_penghuni_id || ""}
          onChange={handleChange}
          placeholder="ID Penghuni (opsional)"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditRumah;
