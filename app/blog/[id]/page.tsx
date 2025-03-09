import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Typography, Container, Box, Breadcrumbs, Divider, Avatar, Paper } from "@mui/material"
import { Calendar, User, Tag } from "lucide-react"
import type { BlogPost } from "@/types/prisma"

async function getBlogPost(id: string) {
  const blogPost = await prisma.blogPost.findUnique({
    where: {
      id,
      published: true,
    },
  })

  if (!blogPost) {
    return null
  }

  return blogPost as BlogPost
}

async function getRelatedPosts(category: string, currentId: string) {
  const relatedPosts = (await prisma.blogPost.findMany({
    where: {
      category,
      id: {
        not: currentId,
      },
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })) as BlogPost[]

  return relatedPosts
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const blogPost = await getBlogPost(params.id)

  if (!blogPost) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(blogPost.category, blogPost.id)

  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            {blogPost.title}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-200">
              Blog
            </Link>
            <Typography color="white">{blogPost.title}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          <Box sx={{ flex: "1 1 70%" }}>
            <Box sx={{ position: "relative", height: 400, borderRadius: 2, overflow: "hidden", mb: 4 }}>
              <Image
                src={blogPost.image || `/placeholder.svg?height=400&width=800&text=Blog`}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 4, color: "text.secondary" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Calendar size={18} />
                <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <User size={18} />
                <span>{blogPost.author}</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tag size={18} />
                <span>{blogPost.category}</span>
              </Box>
            </Box>

            <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
              {blogPost.content}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 64, height: 64 }} alt={blogPost.author}>
                {blogPost.author.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{blogPost.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Penulis
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: "1 1 30%" }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Kategori
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="/blog?category=Tips & Trik" className="text-gray-700 hover:text-blue-600">
                    Tips & Trik
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="/blog?category=Investasi" className="text-gray-700 hover:text-blue-600">
                    Investasi
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="/blog?category=Desain" className="text-gray-700 hover:text-blue-600">
                    Desain
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="/blog?category=Properti" className="text-gray-700 hover:text-blue-600">
                    Properti
                  </Link>
                </Box>
              </Box>
            </Paper>

            {relatedPosts.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Artikel Terkait
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {relatedPosts.map((post: BlogPost) => (
                  <Box
                    key={post.id}
                    sx={{
                      mb: 3,
                      pb: 3,
                      borderBottom: "1px solid #eee",
                      "&:last-child": { mb: 0, pb: 0, borderBottom: "none" },
                    }}
                  >
                    <Link href={`/blog/${post.id}`} className="group">
                      <Box sx={{ position: "relative", height: 120, borderRadius: 1, overflow: "hidden", mb: 2 }}>
                        <Image
                          src={post.image || `/placeholder.svg?height=120&width=240&text=Blog`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Box>
                      <Typography variant="subtitle1" className="group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                    </Link>
                  </Box>
                ))}
              </Paper>
            )}
          </Box>
        </Box>
      </Container>

      <Footer />
    </main>
  )
}

