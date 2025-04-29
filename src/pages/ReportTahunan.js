import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // atau gunakan Recharts
import 'chart.js/auto';

function ReportTahunan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/report/summary-tahunan")
      .then(res => res.json())
      .then(setData);
  }, []);

  const chartData = {
    labels: data.map(item => item.bulan),
    datasets: [
      {
        label: "Pemasukan",
        data: data.map(item => item.pemasukan),
        backgroundColor: "rgba(34,197,94,0.6)",
      },
      {
        label: "Pengeluaran",
        data: data.map(item => item.pengeluaran),
        backgroundColor: "rgba(239,68,68,0.6)",
      },
      {
        label: "Saldo",
        data: data.map(item => item.saldo),
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Laporan Tahunan</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default ReportTahunan;
