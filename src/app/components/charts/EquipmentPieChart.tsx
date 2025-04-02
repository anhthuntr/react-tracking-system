'use client'
import dynamic from 'next/dynamic';
import { Pie, Cell, Tooltip } from 'recharts';

const PieChart = dynamic(
    () => (
        import("recharts").then(recharts => recharts.PieChart)
    ),
    {
        ssr: false
    }
)
const statusData = [
  { name: 'Operational', value: 30 },
  { name: 'Down', value: 5 },
  { name: 'Maintenance', value: 10 },
  { name: 'Retired', value: 3 },
];

const COLORS = ['#4CAF50', '#F44336', '#FFC107', '#9E9E9E'];

const EquipmentPieChart = () => {
  return (
    <div className="flex justify-center items-center h-80">
      <PieChart width={400} height={400}>
        <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8" label>
          {statusData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default EquipmentPieChart
