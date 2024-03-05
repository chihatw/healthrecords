import { WorkoutRecord } from '../schema';

export function convertSixtyToTen(minutes: number, seconds: number) {
  return minutes * 60 + seconds;
}

export function convertTenToSixty(_seconds: number): {
  minutes: number;
  seconds: number;
} {
  let minutes = Math.floor(_seconds / 60);
  let seconds = _seconds % 60;
  return { minutes, seconds };
}

export function buildDailyTemps(records: WorkoutRecord[]): [Date, number][] {
  const data: [Date, number][] = records.map((record) => [
    record.date,
    record.temperature,
  ]);

  return data;
}

export function buildDailyWakeup(
  records: WorkoutRecord[]
): [Date, [number, number, number]][] {
  const data: [Date, [number, number, number]][] = records.map((record) => [
    record.date,
    [...record.wakeup, 0],
  ]);
  return data;
}

export function buildDailyDistances(
  records: WorkoutRecord[]
): [Date, number][] {
  const data: [Date, number][] = records.map((record) => [
    record.date,
    record.distance,
  ]);

  return data;
}

export function buildDailyCalories(records: WorkoutRecord[]): [Date, number][] {
  const data: [Date, number][] = records.map((record) => [
    record.date,
    record.calories,
  ]);

  return data;
}

export function buildDailyBpms(
  records: WorkoutRecord[]
): [Date, number, number][] {
  const date: [Date, number, number][] = records.map((record) => [
    record.date,
    record.bpm_max,
    record.bpm_avg,
  ]);
  return date;
}

export function buildDailyWorkouts(
  records: WorkoutRecord[]
): [Date, number, number, number, number, number, number][] {
  const data: [Date, number, number, number, number, number, number][] =
    records.map((record) => [
      record.date,
      convertSixtyToTen(record.vo2_max.at(0)!, record.vo2_max.at(1)!),
      convertSixtyToTen(record.anaerobic.at(0)!, record.anaerobic.at(1)!),
      convertSixtyToTen(record.aerobic.at(0)!, record.aerobic.at(1)!),
      convertSixtyToTen(record.intensive.at(0)!, record.intensive.at(1)!),
      convertSixtyToTen(record.light.at(0)!, record.light.at(1)!),
      convertSixtyToTen(record.relax.at(0)!, record.relax.at(1)!),
    ]);
  return data;
}

export function buildDailyDurations(
  records: WorkoutRecord[]
): [Date, number][] {
  const data: [Date, number][] = records.map((record) => {
    const duration =
      convertSixtyToTen(record.vo2_max.at(0)!, record.vo2_max.at(1)!) +
      convertSixtyToTen(record.anaerobic.at(0)!, record.anaerobic.at(1)!) +
      convertSixtyToTen(record.aerobic.at(0)!, record.aerobic.at(1)!) +
      convertSixtyToTen(record.intensive.at(0)!, record.intensive.at(1)!) +
      convertSixtyToTen(record.light.at(0)!, record.light.at(1)!) +
      convertSixtyToTen(record.relax.at(0)!, record.relax.at(1)!);
    return [record.date, duration];
  });
  return data;
}

export function buildDailyPaceAvgs(records: WorkoutRecord[]): [Date, number][] {
  const data: [Date, number][] = records.map((record) => {
    const duration =
      convertSixtyToTen(record.vo2_max.at(0)!, record.vo2_max.at(1)!) +
      convertSixtyToTen(record.anaerobic.at(0)!, record.anaerobic.at(1)!) +
      convertSixtyToTen(record.aerobic.at(0)!, record.aerobic.at(1)!) +
      convertSixtyToTen(record.intensive.at(0)!, record.intensive.at(1)!) +
      convertSixtyToTen(record.light.at(0)!, record.light.at(1)!) +
      convertSixtyToTen(record.relax.at(0)!, record.relax.at(1)!);
    return [record.date, duration / 60 / (record.distance / 1000)];
  });
  return data;
}
