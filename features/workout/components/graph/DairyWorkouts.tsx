'use client';

import Chart from 'react-google-charts';

type Props = {
  label: string;
  dataLabel: string[];
  data: [Date, number, number, number, number, number, number][];
};

const DairyWorkouts = ({ data, label, dataLabel }: Props) => {
  return (
    <Chart
      width='100%'
      height='600px'
      chartType='ColumnChart'
      options={{
        title: label,
        isStacked: true,
        hAxis: { format: 'M/d' },
        vAxis: { title: '累計時間（秒）' },
      }}
      data={[['日付', ...dataLabel], ...data]}
    />
  );
};

export default DairyWorkouts;
