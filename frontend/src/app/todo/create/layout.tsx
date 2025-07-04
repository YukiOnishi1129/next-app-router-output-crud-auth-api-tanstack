import { BaseLayout } from "@/shared/components/layout";
import { ReactNode } from "react";

interface TodoCreateLayoutProps {
  children: ReactNode;
}

export default function TodoCreateLayout({ children }: TodoCreateLayoutProps) {
  return <BaseLayout title="Create Todo">{children}</BaseLayout>;
}
