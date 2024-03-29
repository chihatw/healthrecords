import DairyBpms from '@/features/workout/components/graph/DairyBpms';
import DailyCalories from '@/features/workout/components/graph/DairyCalories';
import DailyDistances from '@/features/workout/components/graph/DairyDistances';
import DailyDpbs from '@/features/workout/components/graph/DairyDpbs';
import DailyPaceAvgs from '@/features/workout/components/graph/DairyPaceAvgs';
import DailyTemperature from '@/features/workout/components/graph/DairyTemperature';
import DailyWakeup from '@/features/workout/components/graph/DairyWakeup';
import DailyWorkouts from '@/features/workout/components/graph/DairyWorkouts';
import { getWorkoutRecords } from '@/features/workout/services/server';
import {
  buildDailyBpms,
  buildDailyCalories,
  buildDailyDistances,
  buildDailyDpbs,
  buildDailyPaceAvgs,
  buildDailyTemps,
  buildDailyWakeup,
  buildDailyWorkouts,
} from '@/features/workout/services/utils';

export default async function Home() {
  const records = await getWorkoutRecords();

  const dailyBpms = buildDailyBpms(records);
  const dailyCalories = buildDailyCalories(records);
  const dailyTemps = buildDailyTemps(records);
  const dailyWakeups = buildDailyWakeup(records);
  const dailyDistances = buildDailyDistances(records);
  const dailyWorkouts = buildDailyWorkouts(records);
  const dailyPaceAvgs = buildDailyPaceAvgs(records);
  const dailyDpbs = buildDailyDpbs(records);

  console.log({ dailyDpbs });

  if (!records.length) return <></>;

  return (
    <main className='mx-auto w-full  max-w-lg space-y-10 pb-40 pt-10'>
      <DailyWorkouts
        data={dailyWorkouts}
        label='運動強度'
        dataLabel={[
          'VO₂ max',
          '無酸素運動',
          '有酸素運動',
          'インテンシブ',
          'ライト',
          'リラックス',
        ]}
      />
      <DairyBpms
        data={dailyBpms}
        label='BPM'
        dataLabels={['最大BPM', '平均BPM']}
      />
      <DailyPaceAvgs label='平均ペース' data={dailyPaceAvgs} />
      <DailyDpbs label='平均ペース ÷ 平均BPM' data={dailyDpbs} />
      <DailyDistances data={dailyDistances} label='距離' />
      <DailyCalories data={dailyCalories} label='消費カロリー' />
      <DailyWakeup data={dailyWakeups} label='起床時間' />
      <DailyTemperature data={dailyTemps} label='気温' />
    </main>
  );
}
