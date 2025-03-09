import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, role, content, rating, image } = body

    if (!name || !role || !content || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        rating: Number(rating),
        image: image || "/placeholder.svg?height=80&width=80",
        approved: false,
      },
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}

