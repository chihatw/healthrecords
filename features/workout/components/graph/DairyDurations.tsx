'use client';

import Chart from 'react-google-charts';

type Props = {
  label: string;
  data: [Date, number][];
};

const DairyDurations = ({ label, data }: Props) => {
  return (
    <Chart
      chartType='LineChart'
      options={{
        title: label,
        curveType: 'function',
        hAxis: { format: 'M/d' },
        vAxis: { title: '累計時間（秒）' },
        legend: { position: 'none' },
      }}
      data={[['日付', label], ...data]}
    />
  );
};

export default DairyDurations;
