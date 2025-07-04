import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { TodoDetailTemplate } from "@/features/todos/components";
import { getTodo } from "@/features/todos/apis/todoApi";
import { getQueryClient } from "@/shared/lib/queryClient";
import { QUERY_KEYS } from "@/features/todos/constants/queryKeys";

type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.todo(id),
    queryFn: () => getTodo({ id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoDetailTemplate id={id} />
    </HydrationBoundary>
  );
}
