import { BaseLayout } from "@/shared/components/layout";
import { ReactNode } from "react";

interface TodoDetailLayoutProps {
  children: ReactNode;
}

export default function TodoDetailLayout({ children }: TodoDetailLayoutProps) {
  return <BaseLayout title="Todo Detail">{children}</BaseLayout>;
}
