import { auth, signOut as signOutNextAuth } from '@/auth';
import { authClient } from '@/firebase/client';
import { signOut as signOutFirebase } from 'firebase/auth';
import { Database, DoorClosed, DoorOpen, Home } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

const Header = () => {
  return (
    <nav className='grid h-12 shadow '>
      <div className='container flex w-full items-center justify-between  mx-auto'>
        <HomeIcon />
        <div className='flex items-center gap-4'>
          <AuthPane />
        </div>
      </div>
    </nav>
  );
};

export default Header;

const HomeIcon = () => {
  return (
    <Link
      href={'/'}
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
    >
      <Home />
    </Link>
  );
};

const AuthPane = async () => {
  const session = await auth();
  const uid = session?.user?.id || '';

  const action = async () => {
    'use server';
    await signOutNextAuth();
    await signOutFirebase(authClient);
  };
  return (
    <div className='flex items-center gap-x-2'>
      <Link
        href={'/raw'}
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      >
        <Database />
      </Link>
      {!!uid ? (
        <form action={action}>
          <Button type='submit' variant='ghost' size='icon'>
            <DoorOpen />
          </Button>
        </form>
      ) : (
        <Link
          href='/signin'
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <DoorClosed />
        </Link>
      )}
    </div>
  );
};
