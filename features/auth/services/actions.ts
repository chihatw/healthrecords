'use server';
import { signIn } from '@/auth';

export const signInAction = async (formData: FormData) => {
  await signIn('credentials', formData);
};

export const signUpAction = async (formData: FormData) => {
  await signIn('credentials', formData);
};
