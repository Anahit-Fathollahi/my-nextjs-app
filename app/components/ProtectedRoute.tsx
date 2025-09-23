"use client"

import { ReactNode, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import text from "../../public/locales/fa/common.json"

type Props = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname() 

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [status, router, pathname])

  if (status === "loading") return
   <p className="text-center mt-10"> {text.messages.in_progress} </p>
  if (!session) return null

  return <>{children}</>
}
