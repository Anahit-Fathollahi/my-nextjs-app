import BackButton from "@/app/components/BackButton"
import text from "../../../../public/locales/fa/common.json"
import { notFound } from "next/navigation"

type Post = {
  id: number
  title: string
  author: string
  content?: string
  createdAt: string
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: "no-store", // همیشه داده جدید
    })

    if (!res.ok) return null

    const data = (await res.json()) as Post[]
    return data.find(item => item.id == Number(id)) ?? null
  } catch (e) {
    return null
  }
}

export default async function PostDetailPage(props: { params: Promise<{ id: string }> }) {
  // اینجا params رو باز می‌کنیم
  const { id } = await props.params

  const post = await getPost(id)

  // اگر پست پیدا نشد
  if (!post) {
     notFound();

  }

  return (
    <div className="p-6">
    <BackButton />

      <h1 className="text-3xl font-bold text-purple-600 mb-2">{post.title}</h1>

      <span className="mb-4 block text-black dark:text-red-600">
        {text.author}: {post.author}
      </span>

      <p className="mb-4">{post.content}</p>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {text.created_date}: {new Date(post.createdAt).toLocaleString("fa-IR")}
      </p>
    </div>
  )
}
