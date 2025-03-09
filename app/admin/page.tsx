import React from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import Link from "next/link"
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Chip,
} from "@mui/material"
import { Article as ArticleIcon, Collections as CollectionsIcon, Comment as CommentIcon } from "@mui/icons-material"
import type { Testimonial } from "@/types/prisma"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  // Get counts
  const blogCount = await prisma.blogPost.count()
  const publishedBlogCount = await prisma.blogPost.count({
    where: { published: true },
  })

  const galleryCount = await prisma.galleryItem.count()
  const publishedGalleryCount = await prisma.galleryItem.count({
    where: { published: true },
  })

  const testimonialCount = await prisma.testimonial.count()
  const approvedTestimonialCount = await prisma.testimonial.count({
    where: { approved: true },
  })

  // Get pending testimonials
  const pendingTestimonials = (await prisma.testimonial.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  })) as Testimonial[]

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Selamat datang, {session?.user?.name || "Admin"}!
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 180,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ArticleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography component="h2" variant="h6" color="primary">
                Blog
              </Typography>
            </Box>
            <Typography component="p" variant="h4" sx={{ mb: 2 }}>
              {blogCount}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Chip label={`${publishedBlogCount} Dipublikasikan`} color="success" size="small" sx={{ mr: 1 }} />
              <Chip label={`${blogCount - publishedBlogCount} Draft`} color="warning" size="small" />
            </Box>
            <Box sx={{ mt: "auto" }}>
              <Link href="/admin/blog" style={{ textDecoration: "none" }}>
                <Button size="small" color="primary">
                  Kelola Blog
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 180,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CollectionsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography component="h2" variant="h6" color="primary">
                Galeri
              </Typography>
            </Box>
            <Typography component="p" variant="h4" sx={{ mb: 2 }}>
              {galleryCount}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Chip label={`${publishedGalleryCount} Dipublikasikan`} color="success" size="small" sx={{ mr: 1 }} />
              <Chip label={`${galleryCount - publishedGalleryCount} Draft`} color="warning" size="small" />
            </Box>
            <Box sx={{ mt: "auto" }}>
              <Link href="/admin/gallery" style={{ textDecoration: "none" }}>
                <Button size="small" color="primary">
                  Kelola Galeri
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 180,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CommentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography component="h2" variant="h6" color="primary">
                Testimoni
              </Typography>
            </Box>
            <Typography component="p" variant="h4" sx={{ mb: 2 }}>
              {testimonialCount}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Chip label={`${approvedTestimonialCount} Disetujui`} color="success" size="small" sx={{ mr: 1 }} />
              <Chip label={`${testimonialCount - approvedTestimonialCount} Menunggu`} color="warning" size="small" />
            </Box>
            <Box sx={{ mt: "auto" }}>
              <Link href="/admin/testimonials" style={{ textDecoration: "none" }}>
                <Button size="small" color="primary">
                  Kelola Testimoni
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 0, mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <Typography variant="h6" component="h2">
            Testimoni Menunggu Persetujuan
          </Typography>
        </Box>

        {pendingTestimonials.length > 0 ? (
          <List>
            {pendingTestimonials.map((testimonial: Testimonial) => (
              <React.Fragment key={testimonial.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" component="span">
                          {testimonial.name} - {testimonial.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(testimonial.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                          "{testimonial.content}"
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Link href={`/admin/testimonials/${testimonial.id}`} style={{ textDecoration: "none" }}>
                            <Button size="small" color="primary">
                              Lihat Detail
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">Tidak ada testimoni yang menunggu persetujuan.</Typography>
          </Box>
        )}
      </Paper>
    </>
  )
}

