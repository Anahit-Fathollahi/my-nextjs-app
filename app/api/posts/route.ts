import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const body = await req.json()
  if (!body.title || !body.author) {
    return NextResponse.json({ error: "title و author الزامی است" }, { status: 400 })
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      author: body.author,
      content: body.content || ""
    }
  })
  return NextResponse.json(post, { status: 201 })
}


