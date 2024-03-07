import {
  RecordFormState,
  WorkoutRecord,
  WorkoutRecord_createRecord,
} from '../schema';

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

export function convertStringToSixtyString(input: string) {
  if (!input.length || input.length > 4) return null;

  if (input.split('').some((i) => isNaN(i as unknown as number))) return null;

  let minutes = Number(input.at(-1));
  if (input.at(-2)) {
    minutes = minutes + Number(input.at(-2)) * 10;
  }

  let hours = 0;
  if (input.at(-3)) {
    hours = Number(input.at(-3));
  }
  if (input.at(-4)) {
    hours = hours + Number(input.at(-4)) * 10;
  }

  if (hours < 0 || hours > 59 || minutes < 0 || minutes > 59) return null;

  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function convertStringToSixty(input: string): {
  hours: number;
  minutes: number;
} {
  if (!input.length || input.length > 4) return { hours: 0, minutes: 0 };

  if (input.split('').some((i) => isNaN(i as unknown as number)))
    return { hours: 0, minutes: 0 };

  let minutes = Number(input.at(-1));
  if (input.at(-2)) {
    minutes = minutes + Number(input.at(-2)) * 10;
  }

  let hours = 0;
  if (input.at(-3)) {
    hours = Number(input.at(-3));
  }
  if (input.at(-4)) {
    hours = hours + Number(input.at(-4)) * 10;
  }

  if (hours < 0 || hours > 59 || minutes < 0 || minutes > 59)
    return { hours: 0, minutes: 0 };

  return { hours, minutes };
}

export function buildDailyTemps(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => [
    record.date,
    record.temperature,
  ]);

  return data;
}

export function buildDailyWakeup(
  records: WorkoutRecord[]
): [[number, number, number], [number, number, number]][] {
  const data: [[number, number, number], [number, number, number]][] =
    records.map((record) => [record.date, [...record.wakeup, 0]]);
  return data;
}

export function buildDailyDistances(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => [
    record.date,
    record.distance,
  ]);

  return data;
}

export function buildDailyCalories(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => [
    record.date,
    record.calories,
  ]);

  return data;
}

export function buildDailyBpms(
  records: WorkoutRecord[]
): [[number, number, number], number, number][] {
  const date: [[number, number, number], number, number][] = records.map(
    (record) => [record.date, record.bpm_max, record.bpm_avg]
  );
  return date;
}

export function buildDailyWorkouts(
  records: WorkoutRecord[]
): [
  [number, number, number],
  number,
  number,
  number,
  number,
  number,
  number
][] {
  const data: [
    [number, number, number],
    number,
    number,
    number,
    number,
    number,
    number
  ][] = records.map((record) => [
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
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => {
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

export function buildDailyPaceAvgs(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => {
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

export function checkRecordFormDisabled(state: RecordFormState) {
  let disabled = false;
  if (
    !state.distance ||
    !state.calories ||
    !state.bpm_avg ||
    !state.bpm_max ||
    !convertStringToSixtyString(state.wakeup) ||
    !convertStringToSixtyString(state.vo2_max) ||
    !convertStringToSixtyString(state.anaerobic) ||
    !convertStringToSixtyString(state.aerobic) ||
    !convertStringToSixtyString(state.intensive) ||
    !convertStringToSixtyString(state.light) ||
    !convertStringToSixtyString(state.relax)
  ) {
    disabled = true;
  }
  return disabled;
}

export function buildWorkoutRecord_createRecord(state: RecordFormState) {
  const wakeup = convertStringToSixty(state.wakeup);
  const vo2_max = convertStringToSixty(state.vo2_max);
  const anaerobic = convertStringToSixty(state.anaerobic);
  const aerobic = convertStringToSixty(state.aerobic);
  const intensive = convertStringToSixty(state.intensive);
  const light = convertStringToSixty(state.light);
  const relax = convertStringToSixty(state.relax);

  const recode: WorkoutRecord_createRecord = {
    temperature: state.temperature,
    wakeup: [wakeup.hours, wakeup.minutes],
    distance: state.distance,
    calories: state.calories,
    bpm_avg: state.bpm_avg,
    bpm_max: state.bpm_max,
    vo2_max: [vo2_max.hours, vo2_max.minutes],
    anaerobic: [anaerobic.hours, anaerobic.minutes],
    aerobic: [aerobic.hours, aerobic.minutes],
    intensive: [intensive.hours, intensive.minutes],
    light: [light.hours, light.minutes],
    relax: [relax.hours, relax.hours],
    date: [state.y, state.m, state.d],
  };
  return recode;
}

export function buildDateData(array: any[]): any[] {
  return array.map((item) => {
    const [date, ...other] = item;
    return [new Date(`${date[0]}/${date[1]}/${date[2]}`), ...other];
  });
}

export function serializeDateArray(array: [number, number, number]): number {
  return array[0] * 1000 + array[1] * 100 + array[2];
}
