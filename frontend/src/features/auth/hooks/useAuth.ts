'use client';

import { useMutation } from '@tanstack/react-query';
import { login, register } from '../apis/authApi';
import { LoginRequest, SignUpRequest } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => login(data),
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: SignUpRequest) => register(data),
  });
};