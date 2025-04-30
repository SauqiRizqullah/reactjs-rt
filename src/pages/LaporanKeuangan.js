import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

function LaporanKeuangan() {
  const [tahunTahunan, setTahunTahunan] = useState(new Date().getFullYear());
  const [tahunBulanan, setTahunBulanan] = useState(2025);
  const [bulan, setBulan] = useState(12);

  const [dataTahunan, setDataTahunan] = useState([]);
  const [dataBulanan, setDataBulanan] = useState({ pemasukan: [], pengeluaran: [] });

  const namaBulan = [
    "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report/summary-tahunan?tahun=${tahunTahunan}`)
      .then(res => res.json())
      .then(setDataTahunan);
  }, [tahunTahunan]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report/detail/${bulan}?tahun=${tahunBulanan}`)
      .then(res => res.json())
      .then(setDataBulanan);
  }, [bulan, tahunBulanan]);

  const chartData = {
    labels: dataTahunan.map(item => item.bulan),
    datasets: [
      {
        label: "Pemasukan",
        data: dataTahunan.map(item => item.pemasukan),
        backgroundColor: "rgba(34,197,94,0.6)",
      },
      {
        label: "Pengeluaran",
        data: dataTahunan.map(item => item.pengeluaran),
        backgroundColor: "rgba(239,68,68,0.6)",
      },
      {
        label: "Saldo",
        data: dataTahunan.map(item => item.saldo),
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      {/* Bagian Laporan Tahunan */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Laporan Tahunan</h2>
          <select
            value={tahunTahunan}
            onChange={e => setTahunTahunan(e.target.value)}
            className="border p-2 rounded"
          >
            {[2024, 2025].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <Bar data={chartData} />
      </div>

      {/* Bagian Detail Bulanan */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex gap-4 items-center mb-4">
          <h2 className="text-xl font-bold">Detail Bulanan</h2>
          <select
            value={bulan}
            onChange={e => setBulan(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{namaBulan[i + 1]}</option>
            ))}
          </select>
          <select
            value={tahunBulanan}
            onChange={e => setTahunBulanan(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[2024, 2025].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Tabel Pemasukan */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Pemasukan</h3>
        <table className="w-full text-sm border mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">No</th>
              <th className="border px-3 py-2 text-left">Nama Penghuni</th>
              <th className="border px-3 py-2 text-left">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {dataBulanan.pemasukan.map((item, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border px-3 py-1">{i + 1}</td>
                <td className="border px-3 py-1">{item.penghuni?.nama || 'N/A'}</td>
                <td className="border px-3 py-1">Rp{item.jumlah.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabel Pengeluaran */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Pengeluaran</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">No</th>
              <th className="border px-3 py-2 text-left">Nama Pengeluaran</th>
              <th className="border px-3 py-2 text-left">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {dataBulanan.pengeluaran.map((item, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border px-3 py-1">{i + 1}</td>
                <td className="border px-3 py-1">{item.nama_pengeluaran}</td>
                <td className="border px-3 py-1">Rp{item.jumlah.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaporanKeuangan;
