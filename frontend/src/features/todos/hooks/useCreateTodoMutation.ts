'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {   createTodo } from '../apis/todoApi';
import { CreateTodoRequest } from '../types';
import { QUERY_KEYS } from '../constants/queryKeys';



export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: (data: CreateTodoRequest) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
};