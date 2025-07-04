import { redirect } from "next/navigation";
import { SignUpTemplate } from "@/features/auth/components";
import { NAVIGATION_LIST } from "@/shared/constants/navigation";
import { getSession } from "@/features/auth/actions/auth";

export default async function SignupPage() {
  const session = await getSession();
  if (session?.user) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <SignUpTemplate />;
}
