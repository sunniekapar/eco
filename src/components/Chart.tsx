import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Chart({xAxisKey, dataKey, data} : any ) {
  return (
    <ResponsiveContainer width="100%" height={375}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#137547" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#137547" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tickLine={false} dataKey={xAxisKey} />
        <YAxis tickLine={false} tickMargin={16} />
        <CartesianGrid strokeOpacity={0.2} vertical={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '8px',
            color: '#09090b',
          }}
        />
        <Area
          type="linear"
          dataKey={dataKey}
          stroke="#137547"
          fillOpacity={1}
          fill="url(#color)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
