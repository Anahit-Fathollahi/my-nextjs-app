import fs from "fs/promises"
import path from "path"

export interface Post {
  id: number
  title: string
  author: string
  content?: string
  createdAt: string
}

const dataDir = path.join(process.cwd(), "data")
const dataFile = path.join(dataDir, "posts.json")

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true })
  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8")
  }
}

export async function readPosts(): Promise<Post[]> {
  await ensureDataFile()
  const raw = await fs.readFile(dataFile, "utf8")
  try {
    const data = JSON.parse(raw)
    return Array.isArray(data) ? (data as Post[]) : []
  } catch {
    return []
  }
}

export async function writePosts(posts: Post[]) {
  await ensureDataFile()
  await fs.writeFile(dataFile, JSON.stringify(posts, null, 2), "utf8")
}

export async function addPost(input: { title: string; author: string; content?: string }) {
  const posts = await readPosts()
  const nextId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1
  const newPost: Post = {
    id: nextId,
    title: input.title,
    author: input.author,
    content: input.content ?? "",
    createdAt: new Date().toISOString(),
  }
  posts.push(newPost)
  await writePosts(posts)
  return newPost
}

export async function getPostById(id: number) {
  const posts = await readPosts()
  return posts.find(p => p.id === id)
}

export async function updatePost(
  id: number,
  updates: Partial<Pick<Post, "title" | "author" | "content">>
) {
  const posts = await readPosts()
  const idx = posts.findIndex(p => p.id === id)
  if (idx === -1) return null
  posts[idx] = { ...posts[idx], ...updates }
  await writePosts(posts)
  return posts[idx]
}

export async function deletePost(id: number) {
  const posts = await readPosts()
  const next = posts.filter(p => p.id !== id)
  if (next.length === posts.length) return false
  await writePosts(next)
  return true
}
