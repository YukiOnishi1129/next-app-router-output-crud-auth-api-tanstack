'use client';

import { useMutation } from '@tanstack/react-query';
import {  register } from '../apis/authApi';
import {  SignUpRequest } from '../types';


export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: SignUpRequest) => register(data),
  });
};