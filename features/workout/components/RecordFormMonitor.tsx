'use client';
import { useMemo } from 'react';
import { RecordFormState } from '../schema';
import {
  convertSixtyToTen,
  convertStringToSixtyString,
  convertTenToSixty,
  parseSixty,
} from '../services/utils';

type Props = { state: RecordFormState };

const RecordFormMonitor = ({ state }: Props) => {
  const duration = useMemo(() => {
    let duration = 0;
    [
      state.vo2_max,
      state.anaerobic,
      state.aerobic,
      state.intensive,
      state.light,
      state.relax,
    ].forEach((input: number) => {
      const { minutes, seconds } = parseSixty(input);
      const time = convertSixtyToTen(minutes, seconds);
      duration = duration + time;
    });
    const { minutes, seconds } = convertTenToSixty(duration);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [state]);
  return (
    <div className='text-xs font-extrabold py-5'>
      <div>{`temperature: ${state.temperature} 度`}</div>
      <div>{`wake up: ${convertStringToSixtyString(state.wakeup) || '-'}`}</div>
      <div>{`distance: ${state.distance} m`}</div>
      <div>{`calories: ${state.calories} kcal`}</div>
      <div>{`BPM (avg): ${state.bpm_avg} bpm`}</div>
      <div>{`BPM (max): ${state.bpm_max} bpm`}</div>
      <div>{`VO₂ max: ${
        convertStringToSixtyString(state.vo2_max) || '-'
      }`}</div>
      <div>{`無酸素運動: ${
        convertStringToSixtyString(state.anaerobic) || '-'
      }`}</div>
      <div>{`有酸素運動: ${
        convertStringToSixtyString(state.aerobic) || '-'
      }`}</div>
      <div>{`インテンシブ: ${
        convertStringToSixtyString(state.intensive) || '-'
      }`}</div>
      <div>{`ライト: ${convertStringToSixtyString(state.light) || '-'}`}</div>
      <div>{`リラックス: ${
        convertStringToSixtyString(state.relax) || '-'
      }`}</div>
      <div>{`合計時間: ${duration}`}</div>
    </div>
  );
};

export default RecordFormMonitor;
