'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import { signInAction } from '../../services/actions';

type Props = {
  errMsg: string;
  email: string;
  password: string;
  disabled: boolean;
};

const INITIAL_STATE: Props = {
  errMsg: '',
  email: '',
  password: '',
  disabled: true,
};

const LogInForm = () => {
  const form = useRef<null | HTMLFormElement>(null);
  const [props, setProps] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    if (!form.current) return;
    const formData = new FormData(form.current);

    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const disabled = password.length < 6 || !isValidEmail(email);

    setProps({
      email,
      password,
      disabled,
      errMsg: '',
    });
  };

  const action = async (formData: FormData) => {
    startTransition(async () => {
      let isError = false;
      try {
        await signInAction(formData);
      } catch (error) {
        console.log(error);
        isError = true;
      } finally {
        let newProps = { ...props };
        if (isError) {
          newProps = { ...props, errMsg: '⚠️無法登入' };
        } else {
          newProps = INITIAL_STATE;
        }
        setProps(newProps);
      }
    });
  };

  return (
    <div className='relative px-10 pb-10 pt-11'>
      <div className='relative'>
        <form
          ref={form}
          action={action}
          className='grid gap-8'
          onChange={handleChange}
          autoComplete='off'
        >
          <Input placeholder='email' name='email' type='email' />
          <Input placeholder='password' name='password' type='password' />
          <div className='space-y-4'>
            <Button
              type='submit'
              className='space-x-1.5 w-full'
              disabled={isPending || props.disabled}
            >
              <span>Sign in</span>
              {isPending ? <Loader2 className='animate-spin' /> : null}
            </Button>
            {props.errMsg ? (
              <div className='text-red-500 text-xs'>{props.errMsg}</div>
            ) : null}
          </div>
        </form>

        <p className={'text-center text-sm mt-8'}>
          若未持有帳號，請
          <Link
            href='/signup'
            className='hover:underline hover:underline-offset-4 '
          >
            建立帳號
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
