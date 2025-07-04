'use client';

import { useMutation } from '@tanstack/react-query';
import { login } from '../apis/authApi';
import { LoginRequest } from '../types';

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => login(data),
  });
};