'use client';
import Chart from 'react-google-charts';
import { buildDateData } from '../../services/utils';

type Props = {
  label: string;
  data: [[number, number, number], number][];
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
      data={[['日付', label], ...buildDateData(data)]}
    />
  );
};

export default DairyPaceAvgs;
