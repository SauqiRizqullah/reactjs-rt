import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pembayaran() {
  const [pembayarans, setPembayarans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pembayaran")
      .then((res) => res.json())
      .then((data) => setPembayarans(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus pembayaran ini?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/pembayaran/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Pembayaran berhasil dihapus!');
        setPembayarans((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Gagal menghapus pembayaran.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Data Pembayaran</h1>
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Rumah</th>
            <th className="border px-4 py-2">Penghuni</th>
            <th className="border px-4 py-2">Bulan</th>
            <th className="border px-4 py-2">Tahun</th>
            <th className="border px-4 py-2">Jenis Iuran</th>
            <th className="border px-4 py-2">Jumlah</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Tanggal Bayar</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pembayarans.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.rumah?.nomor_rumah}</td>
              <td className="border px-4 py-2 text-center">{item.penghuni?.nama}</td>
              <td className="border px-4 py-2 text-center">{item.bulan}</td>
              <td className="border px-4 py-2 text-center">{item.tahun}</td>
              <td className="border px-4 py-2 text-center capitalize">{item.jenis_iuran}</td>
              <td className="border px-4 py-2 text-center">{item.jenis_iuran === "satpam" ? 100000 : 15000}</td>
              <td className="border px-4 py-2 text-center">
  <span className={item.tanggal_bayar ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
    {item.tanggal_bayar ? "Lunas" : "Belum Lunas"}
  </span>
</td>
<td className="border px-4 py-2 text-center">
  {item.tanggal_bayar ? item.tanggal_bayar : '-'}
</td>
              <td className="border px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => navigate(`/edit-pembayaran/${item.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/create-pembayaran")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md"
        >
          + Tambah Pembayaran
        </button>
      </div>
    </div>
  );
}

export default Pembayaran;
