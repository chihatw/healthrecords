'use client';
import Chart from 'react-google-charts';

type Props = {
  label: string;
  data: [Date, number][];
};

const DairyPaceAvgs = ({ label, data }: Props) => {
  return (
    <Chart
      chartType='LineChart'
      options={{
        title: label,
        curveType: 'function',
        hAxis: { format: 'M/d' },
        vAxis: { title: '1km毎ペース（分）' },
        legend: { position: 'none' },
      }}
      data={[['日付', label], ...data]}
    />
  );
};

export default DairyPaceAvgs;