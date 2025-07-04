import { BaseLayout } from "@/shared/components/layout";
import { ReactNode } from "react";

interface TodoListLayoutProps {
  children: ReactNode;
}

export default function TodoListLayout({ children }: TodoListLayoutProps) {
  return (
    <BaseLayout title="TodoList">
      {children}
    </BaseLayout>
  );
}