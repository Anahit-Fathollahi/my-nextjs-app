import text from "../../public/locales/fa/common.json";
import LoginForm from "./loginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/profile" } = await searchParams || {};
  return <LoginForm callbackUrl={callbackUrl} text={text} />;
}
