'use client';

import { useQuery  } from '@tanstack/react-query';
import {  getTodo } from '../apis/todoApi';

import { QUERY_KEYS } from '../constants/queryKeys';



export const useTodoQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.todo(id),
    queryFn: () => getTodo({ id }),
    enabled: !!id,
  });
};