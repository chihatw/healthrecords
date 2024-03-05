'use client';

import { Chart } from 'react-google-charts';
import { buildDateData } from '../../services/utils';

const DailyTemperature = ({
  label,
  data,
}: {
  label: string;
  data: [[number, number, number], number][];
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
      data={[['日付', label], ...buildDateData(data)]}
    />
  );
};

export default DailyTemperature;
