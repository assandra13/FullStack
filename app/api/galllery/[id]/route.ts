import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const galleryItem = await prisma.galleryItem.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!galleryItem) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json({ error: "Failed to fetch gallery item" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const galleryItem = await prisma.galleryItem.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.galleryItem.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
