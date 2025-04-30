import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePembayaran() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rumah_id: '',
    penghuni_id: '',
    bulan: '',
    tahun: '',
    jenis_iuran: 'satpam',
    tanggal_bayar: '',
  });

  const [rumahList, setRumahList] = useState([]);
  const [penghuniList, setPenghuniList] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/rumah").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/penghunis").then(res => res.json())
    ]).then(([rumahs, penghunis]) => {
      setRumahList(rumahs);
      setPenghuniList(penghunis);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jumlah = formData.jenis_iuran === 'satpam' ? 100000 : 15000;
    const status_pembayaran = formData.tanggal_bayar ? 'lunas' : 'belum';

    const dataToSend = {
      ...formData,
      jumlah,
      status_pembayaran,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pembayaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("Pembayaran berhasil dibuat!");
        navigate("/pembayaran");
      } else {
        alert("Gagal membuat pembayaran.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tambah Pembayaran</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select name="rumah_id" value={formData.rumah_id} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Rumah</option>
          {rumahList.map(r => <option key={r.id} value={r.id}>{r.nomor_rumah}</option>)}
        </select>

        <select name="penghuni_id" value={formData.penghuni_id} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Penghuni</option>
          {penghuniList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
        </select>

        <input type="number" name="bulan" placeholder="Bulan (1-12)" value={formData.bulan} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="tahun" placeholder="Tahun" value={formData.tahun} onChange={handleChange} className="border p-2 rounded" required />

        <select name="jenis_iuran" value={formData.jenis_iuran} onChange={handleChange} className="border p-2 rounded">
          <option value="satpam">Satpam</option>
          <option value="kebersihan">Kebersihan</option>
        </select>

        <input type="date" name="tanggal_bayar" value={formData.tanggal_bayar} onChange={handleChange} className="border p-2 rounded" />

        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreatePembayaran;
