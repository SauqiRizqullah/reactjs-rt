import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPembayaran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rumah_id: '',
    penghuni_id: '',
    bulan: '',
    tahun: '',
    jenis_iuran: '',
    jumlah: '',
    status_pembayaran: '',
    tanggal_bayar: '',
  });
  const [rumahList, setRumahList] = useState([]);
  const [penghuniList, setPenghuniList] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://127.0.0.1:8000/api/pembayaran/${id}`).then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/rumah").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/penghunis").then(res => res.json())
    ]).then(([pembayaran, rumahs, penghunis]) => {
      setFormData(pembayaran);
      setRumahList(rumahs);
      setPenghuniList(penghunis);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/pembayaran/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Pembayaran berhasil diperbarui!");
        navigate("/");
      } else {
        alert("Gagal memperbarui pembayaran.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Pembayaran</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select name="rumah_id" value={formData.rumah_id} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Rumah</option>
          {rumahList.map(r => <option key={r.id} value={r.id}>{r.nomor_rumah}</option>)}
        </select>

        <select name="penghuni_id" value={formData.penghuni_id} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Penghuni</option>
          {penghuniList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
        </select>

        <input type="number" name="bulan" value={formData.bulan} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="tahun" value={formData.tahun} onChange={handleChange} className="border p-2 rounded" required />
        
        <select name="jenis_iuran" value={formData.jenis_iuran} onChange={handleChange} className="border p-2 rounded">
          <option value="satpam">Satpam</option>
          <option value="kebersihan">Kebersihan</option>
        </select>

        <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="border p-2 rounded" required />

        <select name="status_pembayaran" value={formData.status_pembayaran} onChange={handleChange} className="border p-2 rounded">
          <option value="belum">Belum Lunas</option>
          <option value="lunas">Lunas</option>
        </select>

        <input type="date" name="tanggal_bayar" value={formData.tanggal_bayar || ''} onChange={handleChange} className="border p-2 rounded" />

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default EditPembayaran;
