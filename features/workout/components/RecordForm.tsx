'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { RecordFormState } from '../schema';
import { addWorkoutRecord } from '../services/actions';
import { checkRecordFormDisabled } from '../services/utils';
import RecordFormMonitor from './RecordFormMonitor';

type Props = {};

const INITIAL_STATE: RecordFormState = {
  temperature: 0,
  wakeup: 0,
  distance: 0,
  calories: 0,
  bpm_avg: 0,
  bpm_max: 0,
  vo2_max: 0,
  anaerobic: 0,
  aerobic: 0,
  intensive: 0,
  light: 0,
  relax: 0,
  disabled: true,
  errMsg: '',
  y: new Date().getFullYear(),
  m: new Date().getMonth() + 1,
  d: new Date().getDate(),
};

const RecordForm = (props: Props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const result = await addWorkoutRecord(state);
      if (result) {
        setState((prev) => ({ ...prev, errMsg: result }));
        return;
      }
      setState(INITIAL_STATE);
    });
  };

  return (
    <form className='mx-auto max-w-sm space-y-2' action={action}>
      <div className='grid grid-cols-2 gap-2'>
        <InputWrapper label='気温'>
          <Input
            placeholder='temperature'
            type='number'
            value={state.temperature}
            onChange={(e) =>
              setState((prev) => {
                const updated = {
                  ...prev,
                  temperature: Number(e.target.value),
                };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              })
            }
          />
        </InputWrapper>
        <InputWrapper label='起床時間'>
          <Input
            placeholder='wake up'
            type='number'
            value={state.wakeup}
            onChange={(e) =>
              setState((prev) => {
                const updated = { ...prev, wakeup: Number(e.target.value) };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              })
            }
          />
        </InputWrapper>
        <InputWrapper label='走行距離'>
          <Input
            placeholder='distance'
            type='number'
            value={state.distance}
            min={0}
            onChange={(e) => {
              console.log('value');
              setState((prev) => {
                const updated = { ...prev, distance: Number(e.target.value) };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              });
            }}
          />
        </InputWrapper>
        <InputWrapper label='消費カロリー'>
          <Input
            placeholder='calories'
            min={0}
            type='number'
            value={state.calories}
            onChange={(e) =>
              setState((prev) => {
                const updated = { ...prev, calories: Number(e.target.value) };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              })
            }
          />
        </InputWrapper>
        <InputWrapper label='BPM (avg)'>
          <Input
            placeholder='BPM (avg)'
            min={0}
            type='number'
            value={state.bpm_avg}
            onChange={(e) =>
              setState((prev) => {
                const updated = { ...prev, bpm_avg: Number(e.target.value) };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              })
            }
          />
        </InputWrapper>
        <InputWrapper label='BPM (max)'>
          <Input
            placeholder='BPM (max)'
            min={0}
            type='number'
            value={state.bpm_max}
            onChange={(e) =>
              setState((prev) => {
                const updated = { ...prev, bpm_max: Number(e.target.value) };
                const disabled = checkRecordFormDisabled(updated);
                return { ...updated, disabled, errMsg: '' };
              })
            }
          />
        </InputWrapper>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        <Input
          placeholder='VO₂ max'
          min={0}
          type='number'
          value={state.vo2_max}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, vo2_max: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='anaerobic'
          min={0}
          type='number'
          value={state.anaerobic}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, anaerobic: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='aerobic'
          min={0}
          type='number'
          value={state.aerobic}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, aerobic: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='intensive'
          min={0}
          type='number'
          value={state.intensive}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, intensive: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='light'
          min={0}
          type='number'
          value={state.light}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, light: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='relax'
          min={0}
          type='number'
          value={state.relax}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, relax: Number(e.target.value) };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
      </div>
      <RecordFormMonitor state={state} />
      <Button
        className='w-full'
        type='submit'
        disabled={state.disabled || isPending}
      >
        send
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
    </form>
  );
};

export default RecordForm;

const InputWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className='grid grid-cols-2 items-center gap-2'>
      <div className='font-extrabold text-xs whitespace-nowrap'>{`${label}:`}</div>
      {children}
    </div>
  );
};
