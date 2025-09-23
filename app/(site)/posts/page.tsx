import Link from "next/link"
import { headers } from "next/headers"
import text from "../../../public/locales/fa/common.json"

type Post = {
  id: number
  title: string
  author: string
  content?: string
  createdAt: string
}

async function getPosts(): Promise<Post[]> {
  try {
    const headersList = headers()
    const host = (await headersList).get("host")
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

    const res = await fetch(`${protocol}://${host}/api/posts`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error(text.messages.fetchError)
    return res.json()
  } catch (err) {
    console.error("❌ خطا در گرفتن پست‌ها:", err)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">{text.posts}</h1>

      {posts.length === 0 ? (
        <p>{text.no_posts}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((p) => (
            <li
              key={p.id}
              className="border border-gray-300 p-4 rounded hover:shadow"
            >
              <Link
                href={`/posts/${p.id}`}
                className="text-xl font-bold text-blue-600 hover:underline"
              >
                {p.title}
              </Link>

              <p>{text.author}: {p.author}</p>
              {p.content && <p className="mt-2">{p.content}</p>}
              <p className="text-sm mt-1">
                {new Date(p.createdAt).toLocaleString("fa-IR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
