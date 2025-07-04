'use client';

import {  useMutation, useQueryClient } from '@tanstack/react-query';
import {   updateTodo } from '../apis/todoApi';
import {  UpdateTodoRequest } from '../types';
import { QUERY_KEYS } from '../constants/queryKeys';





export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: (data: UpdateTodoRequest) => updateTodo(data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
      if (response.data) {
        queryClient.setQueryData(QUERY_KEYS.todo(variables.id), response.data);
      }
    },
  });
};