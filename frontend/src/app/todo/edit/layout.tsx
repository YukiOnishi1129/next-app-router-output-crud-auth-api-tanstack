import { BaseLayout } from "@/shared/components/layout";
import { ReactNode } from "react";

interface TodoEditLayoutProps {
  children: ReactNode;
}

export default function TodoEditLayout({ children }: TodoEditLayoutProps) {
  return (
    <BaseLayout title="Edit Todo">
      {children}
    </BaseLayout>
  );
}