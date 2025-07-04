'use client';

import { useQuery,  } from '@tanstack/react-query';
import { getTodoList, 
} from '../apis/todoApi';

import { QUERY_KEYS } from '../constants/queryKeys';


export const useTodoListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: getTodoList,
  });
};