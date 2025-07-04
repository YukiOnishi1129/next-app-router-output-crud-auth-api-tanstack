import { TodoListTemplate } from "@/features/todos/components";
import { getTodoList } from "@/features/todos/apis/todoApi";

export default async function TodoListPage() {
  const res = await getTodoList();
  if (!res?.data) {
    return (
      <div>
        {res.errorCode}: {res.errorMessage}
      </div>
    );
  }
  return <TodoListTemplate data={res.data.todos} />;
}
