import ProtectedRoute from "@/app/components/ProtectedRoute"
import { headers } from "next/headers";
import text from "../../../public/locales/fa/common.json"
import dynamic from "next/dynamic";


const DashboardContent = dynamic(() => import("./DashboardContent"), {
  loading: () => <p>{text.loading}</p>,
})

async function getPosts() {
  const host = (await headers()).get("host")
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error(text.messages.fetchError)
  return res.json()
}

export default async function DashboardPage() {
  const posts = await getPosts()

  return (
    <ProtectedRoute>
      <DashboardContent initialPosts={posts} />
    </ProtectedRoute>
  )
}

export type Post = {
  id: number
  title: string
  author: string
  content?: string
  createdAt: string
}
