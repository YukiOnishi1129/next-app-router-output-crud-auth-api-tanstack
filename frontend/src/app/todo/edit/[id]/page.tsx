import { TodoEditTemplate } from "@/features/todos/components";
import { getTodo } from "@/features/todos/apis/todoApi";

type TodoEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoEditPage({ params }: TodoEditPageProps) {
  const { id } = await params;
  const res = await getTodo({
    id,
  });
  if (!res?.data) {
    return (
      <div>
        {res.errorCode}: {res.errorMessage}
      </div>
    );
  }
  return <TodoEditTemplate todo={res.data} />;
}
