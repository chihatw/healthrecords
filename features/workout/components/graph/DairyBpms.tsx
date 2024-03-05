'use client';

import Chart from 'react-google-charts';

type Props = {
  label: string;
  dataLabels: string[];
  data: [Date, number, number][];
};

const DairyBpms = ({ label, dataLabels, data }: Props) => {
  return (
    <Chart
      chartType='LineChart'
      options={{
        title: label,
        curveType: 'function',
        hAxis: { format: 'M/d' },
      }}
      data={[['日付', ...dataLabels], ...data]}
    />
  );
};

export default DairyBpms;
