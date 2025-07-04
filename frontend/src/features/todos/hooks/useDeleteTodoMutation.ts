"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../apis/todoApi";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: string) => deleteTodo({ id }),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.todo(deletedId) });
    },
  });
};
