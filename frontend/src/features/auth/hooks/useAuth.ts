'use client';

import { useMutation } from '@tanstack/react-query';
import { login, register } from '../apis/authApi';
import { LoginRequest, SignUpRequest } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      console.log('Login successful', data);
    },
    onError: (error) => {
      console.error('Login failed', error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: SignUpRequest) => register(data),
    onSuccess: (data) => {
      console.log('Registration successful', data);
    },
    onError: (error) => {
      console.error('Registration failed', error);
    },
  });
};