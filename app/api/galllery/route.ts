import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { title, location, price, category, description, image, published } = body

    if (!title || !location || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const galleryItem = await prisma.galleryItem.create({
      data: {
        title,
        location,
        price,
        category,
        description: description || "",
        image: image || "/placeholder.svg?height=300&width=400",
        published: published || false,
      },
    })

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

