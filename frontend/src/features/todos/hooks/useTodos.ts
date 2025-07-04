'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodoList, getTodo, createTodo, updateTodo, deleteTodo } from '../apis/todoApi';
import { CreateTodoRequest, UpdateTodoRequest } from '../types';
import { QUERY_KEYS } from '../constants/queryKeys';

export { QUERY_KEYS };

export const useTodos = () => {
  return useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: getTodoList,
  });
};

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.todo(id),
    queryFn: () => getTodo({ id }),
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: (data: CreateTodoRequest) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
};

export const useUpdateTodo = () => {
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

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: (id: string) => deleteTodo({ id }),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.todo(deletedId) });
    },
  });
};