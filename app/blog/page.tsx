import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Typography, Container, Grid, Card, CardContent, CardMedia, Box, Breadcrumbs, Pagination } from "@mui/material"
import { Calendar, User } from "lucide-react"
import type { BlogPost } from "@/types/prisma"

async function getBlogPosts() {
  const blogPosts = (await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as BlogPost[]

  return blogPosts
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Blog & Artikel
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Typography color="white">Blog</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <Grid container spacing={4}>
            {blogPosts.length > 0 ? (
              blogPosts.map((post: BlogPost) => (
                <Grid item xs={12} md={6} lg={4} key={post.id}>
                  <Card
                    sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3 }}
                  >
                    <CardMedia component="div" sx={{ pt: "56.25%", position: "relative" }}>
                      <Image
                        src={post.image || `/placeholder.svg?height=200&width=400&text=Blog`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          bgcolor: "primary.main",
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 5,
                          fontSize: "0.75rem",
                          fontWeight: "medium",
                        }}
                      >
                        {post.category}
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", gap: 2, mb: 2, color: "text.secondary", fontSize: "0.875rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Calendar size={16} />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <User size={16} />
                          <span>{post.author}</span>
                        </Box>
                      </Box>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {post.excerpt}
                      </Typography>
                      <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        Baca Selengkapnya
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Belum ada artikel blog yang tersedia.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {blogPosts.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination count={1} color="primary" size="large" />
            </Box>
          )}
        </Suspense>
      </Container>

      <Footer />
    </main>
  )
}

