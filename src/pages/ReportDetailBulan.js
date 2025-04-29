import { useEffect, useState } from "react";

function ReportDetailBulan({ bulan = 4 }) {
  const [data, setData] = useState({ pemasukan: [], pengeluaran: [] });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report/detail/${bulan}`)
      .then(res => res.json())
      .then(setData);
  }, [bulan]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Detail Bulan ke-{bulan}</h2>

      <h3 className="text-lg font-semibold mt-4">Pemasukan</h3>
      <ul className="list-disc ml-5">
        {data.pemasukan.map((item, i) => (
          <li key={i}>{item.nama_penghuni} - Rp{item.jumlah}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">Pengeluaran</h3>
      <ul className="list-disc ml-5">
        {data.pengeluaran.map((item, i) => (
          <li key={i}>{item.keterangan} - Rp{item.jumlah}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReportDetailBulan;
