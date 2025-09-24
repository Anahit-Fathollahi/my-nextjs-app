import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import text from "../../../../public/locales/fa/common.json"

// دریافت همه‌ی پست‌ها
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(posts)
}

// ایجاد پست جدید
export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.title || !body.author) {
    return NextResponse.json({ error: text.username_required }, { status: 400 })
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      author: body.author,
      content: body.content || "",
    },
  })

  return NextResponse.json(post, { status: 201 })
}

// حذف یک پست بر اساس id
export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">
) {
  const id = Number((await ctx.params).id)
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

// ویرایش یک پست بر اساس id
export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">
) {
  const id = Number((await ctx.params).id)
  const body = await req.json()

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: body.title,
      author: body.author,
      content: body.content || "",
    },
  })

  return NextResponse.json(post)
}
