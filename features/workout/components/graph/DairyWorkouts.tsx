'use client';

import Chart from 'react-google-charts';
import { buildDateData } from '../../services/utils';

type Props = {
  label: string;
  dataLabel: string[];
  data: [
    [number, number, number],
    number,
    number,
    number,
    number,
    number,
    number
  ][];
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
        vAxis: { title: '累計時間（分）' },
      }}
      data={[['日付', ...dataLabel], ...buildDateData(data)]}
    />
  );
};

export default DairyWorkouts;
