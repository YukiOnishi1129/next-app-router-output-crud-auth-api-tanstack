import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { TodoListTemplate } from "@/features/todos/components";
import { getTodoList } from "@/features/todos/apis/todoApi";
import { getQueryClient } from "@/shared/lib/queryClient";
import { QUERY_KEYS } from "@/features/todos/constants/queryKeys";

export default async function TodoListPage() {
  const queryClient = getQueryClient();

  // サーバーで事前にデータをフェッチしてキャッシュに保存
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: getTodoList,
  });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>: サーバーのキャッシュ状態をクライアントに送信
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoListTemplate />
    </HydrationBoundary>
  );
}
