// app/login/page.tsx
import text from "../../public/locales/fa/common.json"
import LoginForm from "./loginForm"


export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const callbackUrl = searchParams?.callbackUrl || "/profile"

  return <LoginForm callbackUrl={callbackUrl} text={text} />
}
