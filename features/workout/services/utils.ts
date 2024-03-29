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

export function parseSixty(input: number): {
  minutes: number;
  seconds: number;
} {
  let minutes = 0;
  let seconds = 0;

  if (input.toString().at(-1)) {
    seconds += Number(input.toString().at(-1));
  }
  if (input.toString().at(-2)) {
    seconds += Number(input.toString().at(-2)) * 10;
  }

  if (input.toString().at(-3)) {
    minutes += Number(input.toString().at(-3));
  }
  if (input.toString().at(-4)) {
    minutes += Number(input.toString().at(-4)) * 10;
  }

  return { minutes, seconds };
}

export function convertStringToSixtyString(input: number) {
  if (input < 0) return null;

  let minutes = Number(input.toString().at(-1));
  if (input.toString().at(-2)) {
    minutes = minutes + Number(input.toString().at(-2)) * 10;
  }

  let hours = 0;
  if (input.toString().at(-3)) {
    hours = Number(input.toString().at(-3));
  }
  if (input.toString().at(-4)) {
    hours = hours + Number(input.toString().at(-4)) * 10;
  }

  if (hours < 0 || minutes < 0 || minutes > 59) return null;

  return `${hours}:${minutes.toString().padStart(2, '0')}`;
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
export function buildDailyDpbs(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => {
    const duration = getDuration(record);
    const pace_avg = duration / 60 / (record.distance / 1000);
    const pace_avg_per_bpm_avg = (pace_avg / record.bpm_avg) * 100;

    return [record.date, pace_avg_per_bpm_avg];
  });
  return data;
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
    convertSixtyToTen(record.vo2_max.at(0)!, record.vo2_max.at(1)!) / 60,
    convertSixtyToTen(record.anaerobic.at(0)!, record.anaerobic.at(1)!) / 60,
    convertSixtyToTen(record.aerobic.at(0)!, record.aerobic.at(1)!) / 60,
    convertSixtyToTen(record.intensive.at(0)!, record.intensive.at(1)!) / 60,
    convertSixtyToTen(record.light.at(0)!, record.light.at(1)!) / 60,
    convertSixtyToTen(record.relax.at(0)!, record.relax.at(1)!) / 60,
  ]);
  return data;
}

export function buildDailyDurations(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => {
    const duration = getDuration(record);
    return [record.date, duration];
  });
  return data;
}

export function buildDailyPaceAvgs(
  records: WorkoutRecord[]
): [[number, number, number], number][] {
  const data: [[number, number, number], number][] = records.map((record) => {
    const duration = getDuration(record);
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
  const wakeup = parseSixty(state.wakeup);
  const vo2_max = parseSixty(state.vo2_max);
  const anaerobic = parseSixty(state.anaerobic);
  const aerobic = parseSixty(state.aerobic);
  const intensive = parseSixty(state.intensive);
  const light = parseSixty(state.light);
  const relax = parseSixty(state.relax);

  const createdAt = Date.now();
  const recode: WorkoutRecord_createRecord = {
    temperature: state.temperature,
    wakeup: [wakeup.minutes, wakeup.seconds],
    distance: state.distance,
    calories: state.calories,
    bpm_avg: state.bpm_avg,
    bpm_max: state.bpm_max,
    vo2_max: [vo2_max.minutes, vo2_max.seconds],
    anaerobic: [anaerobic.minutes, anaerobic.seconds],
    aerobic: [aerobic.minutes, aerobic.seconds],
    intensive: [intensive.minutes, intensive.seconds],
    light: [light.minutes, light.seconds],
    relax: [relax.minutes, relax.seconds],
    date: [state.y, state.m, state.d],
    createdAt,
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

function getDuration(record: WorkoutRecord) {
  const duration =
    convertSixtyToTen(record.vo2_max.at(0)!, record.vo2_max.at(1)!) +
    convertSixtyToTen(record.anaerobic.at(0)!, record.anaerobic.at(1)!) +
    convertSixtyToTen(record.aerobic.at(0)!, record.aerobic.at(1)!) +
    convertSixtyToTen(record.intensive.at(0)!, record.intensive.at(1)!) +
    convertSixtyToTen(record.light.at(0)!, record.light.at(1)!) +
    convertSixtyToTen(record.relax.at(0)!, record.relax.at(1)!);
  return duration;
}
