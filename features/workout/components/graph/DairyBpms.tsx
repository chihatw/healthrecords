'use client';

import Chart from 'react-google-charts';
import { buildDateData } from '../../services/utils';

type Props = {
  label: string;
  dataLabels: string[];
  data: [[number, number, number], number, number][];
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
      data={[['日付', ...dataLabels], ...buildDateData(data)]}
    />
  );
};

export default DairyBpms;
