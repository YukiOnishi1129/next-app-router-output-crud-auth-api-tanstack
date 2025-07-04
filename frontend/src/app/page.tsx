import { redirect } from "next/navigation";
import { LoginTemplate } from "@/features/auth/components";
import { getSession } from "@/features/auth/actions/auth";
import { NAVIGATION_LIST } from "@/shared/constants/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <LoginTemplate />;
}
