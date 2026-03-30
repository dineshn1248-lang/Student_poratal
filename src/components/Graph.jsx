import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  { subject: "Math", A: 80 },
  { subject: "DS", A: 75 },
  { subject: "DBMS", A: 85 },
  { subject: "Web", A: 90 },
  { subject: "OS", A: 70 },
  { subject: "Networks", A: 78 }
];

export default BarGraph{
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            dataKey="A"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}