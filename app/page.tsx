"use client";
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import AboutUs from "@/components/about-us"
import Gallery from "@/components/gallery"
import Blog from "@/components/blog"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import type { Testimonial, GalleryItem, BlogPost } from "@/types/prisma"

// Fungsi untuk konversi Date ke string
function formatDate<T extends { createdAt: Date; updatedAt?: Date }>(item: T): T & { createdAt: string; updatedAt?: string } {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt ? item.updatedAt.toISOString() : undefined,
  }
}

// Ambil data Testimonial
async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  })
  return testimonials.map(formatDate) // Konversi Date ke string
}

// Ambil data Gallery
async function getGalleryItems() {
  return prisma.galleryItem.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

// Ambil data BlogPost
async function getBlogPosts() {
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
  return blogPosts.map(formatDate) // Konversi Date ke string
}

export default async function Home() {
  const testimonials = await getTestimonials()
  const galleryItems = await getGalleryItems()
  const blogPosts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <Suspense fallback={<div>Loading gallery...</div>}>
        <Gallery items={galleryItems} />
      </Suspense>
      <Suspense fallback={<div>Loading blog...</div>}>
        <Blog posts={blogPosts} />
      </Suspense>
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Testimonials testimonials={testimonials} />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  )
}
