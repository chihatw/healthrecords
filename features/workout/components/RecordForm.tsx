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
  wakeup: '',
  distance: 0,
  calories: 0,
  bpm_avg: 0,
  bpm_max: 0,
  vo2_max: '',
  anaerobic: '',
  aerobic: '',
  intensive: '',
  light: '',
  relax: '',
  disabled: true,
  errMsg: '',
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
            type='text'
            value={state.wakeup}
            onChange={(e) =>
              setState((prev) => {
                const updated = { ...prev, wakeup: e.target.value };
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
            type='number'
            min={0}
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
            type='number'
            min={0}
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
            type='number'
            min={0}
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
          type='text'
          value={state.vo2_max}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, vo2_max: e.target.value };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='anaerobic'
          type='text'
          value={state.anaerobic}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, anaerobic: e.target.value };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='aerobic'
          type='text'
          value={state.aerobic}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, aerobic: e.target.value };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='intensive'
          type='text'
          value={state.intensive}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, intensive: e.target.value };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='light'
          type='text'
          value={state.light}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, light: e.target.value };
              const disabled = checkRecordFormDisabled(updated);
              return { ...updated, disabled, errMsg: '' };
            })
          }
        />
        <Input
          placeholder='relax'
          type='text'
          value={state.relax}
          onChange={(e) =>
            setState((prev) => {
              const updated = { ...prev, relax: e.target.value };
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
