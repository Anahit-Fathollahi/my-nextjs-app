"use client"

import { useSession, signOut } from "next-auth/react"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import text from "../../public/locales/fa/common.json"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}


function ProfileContent() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{text.profile}</h1>
      <p>{text.name}: {session?.user?.name}</p>
      <p>{text.email}: {session?.user?.email}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        {text.logout}
      </button>
    </div>
  )
}
