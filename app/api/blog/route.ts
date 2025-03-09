import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { title, excerpt, content, author, category, image, published } = body

    if (!title || !excerpt || !content || !author || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        author,
        category,
        image: image || "/placeholder.svg?height=200&width=400",
        published: published || false,
      },
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

