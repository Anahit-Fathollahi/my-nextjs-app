"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Post } from "./page"
import text from "../../../public/locales/fa/common.json"

type Props = {
  initialPosts: Post[]
}

export default function DashboardContent({ initialPosts }: Props) {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formDeleted, setformDeleted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !author) return

    try {
      if (editingId) {
        const res = await fetch(`/api/posts/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, author, content }),
        })
        if (!res.ok) throw new Error(text.messages.update_error)
        const updated = (await res.json()) as Post
        setPosts(prev => prev.map(p => (p.id === updated.id ? updated : p)))
        setEditingId(null)
      } else {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, author, content }),
        })
        if (!res.ok) throw new Error(text.messages.add_error)
        const created = (await res.json()) as Post
        setPosts(prev => [...prev, created])
      }
      setTitle("")
      setAuthor("")
      setContent("")
    } catch (e: unknown) {
      alert((e as Error).message || text.messages.unknown_error)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(text.be_removed)) return
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error(text.messages.delete_error)
      setPosts(prev => prev.filter(p => p.id !== id))
      if (editingId === id) {
        setEditingId(null)
        setTitle("")
        setAuthor("")
        setContent("")
      }
    } catch (e: unknown) {
      alert((e as Error).message || text.messages.unknown_error)
    }
  }

  function startEdit(id: number) {
    const post = posts.find(p => p.id === id)
    if (!post) return
    setEditingId(id)
    setTitle(post.title)
    setAuthor(post.author)
    setContent(post.content ?? "")
  }

  const deleteForm=() =>{
    setTitle("")
    setAuthor("")
    setContent("")
    setformDeleted(true);
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-6 grid gap-3 sm:grid-cols-5">
        <input
          type="text"
          placeholder={text.title}
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded sm:col-span-1 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder={text.author}
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded sm:col-span-1 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder={text.content}
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded sm:col-span-1 placeholder-gray-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white sm:col-span-1 ${
            editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? text.buttons.update : text.buttons.add}
        </button>
          <button
          type="submit"
          className={`px-4 py-2 rounded text-white sm:col-span-1 ${
            editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={deleteForm}
        >
          {text.buttons.delete_form}
        </button>
      </form>

      <table className="w-full border-collapse border ">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">{text.title}</th>
            <th className="border border-gray-300 px-4 py-2">{text.author}</th>
            <th className="border border-gray-300 px-4 py-2">{text.date}</th>
            <th className="border border-gray-300 px-4 py-2">{text.action}</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{p.title}</td>
              <td className="border border-gray-300 px-4 py-2">{p.author}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(p.createdAt).toLocaleString("fa-IR")}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => router.push(`/posts/${p.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    {text.buttons.view_details}
                  </button>
                  <button
                    onClick={() => startEdit(p.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    {text.buttons.edit}
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
