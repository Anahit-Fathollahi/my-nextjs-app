"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"

type TextType = {
  login_site: string
  username: string
  password: string
  buttons: {
    login: string
  }
  messages: {
    incorrect_username_password: string
  }
}

type Props = {
  callbackUrl: string
  text: TextType
}

export default function LoginForm({ callbackUrl, text }: Props) {
  const { theme } = useTheme()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (res?.error) {
      setError(text.messages.incorrect_username_password)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md w-96 border ${
          theme === "light" ? "border-black" : "border-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">{text.login_site}</h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <input
          type="text"
          placeholder={text.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded placeholder-gray-500"
        />

        <input
          type="password"
          placeholder={text.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {text.buttons.login}
        </button>
      </form>
    </div>
  )
}
