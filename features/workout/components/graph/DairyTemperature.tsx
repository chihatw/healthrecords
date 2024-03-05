'use client';

import { Chart } from 'react-google-charts';

const DailyTemperature = ({
  label,
  data,
}: {
  label: string;
  data: [Date, number][];
}) => {
  return (
    <Chart
      chartType='LineChart'
      options={{
        title: label,
        curveType: 'function',
        hAxis: { format: 'M/d' },
        legend: { position: 'none' },
      }}
      data={[['日付', label], ...data]}
    />
  );
};

export default DailyTemperature;
