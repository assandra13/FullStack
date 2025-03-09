import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Typography, Container, Box, Breadcrumbs, Grid, Paper, Rating } from "@mui/material"
import { Quote } from "lucide-react"
import TestimonialForm from "@/components/testimonial-form"
import type { Testimonial } from "@/types/prisma"

async function getTestimonials() {
  const testimonials = (await prisma.testimonial.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as Testimonial[]

  // Konversi Date objects ke string untuk menghindari masalah serialisasi
  return testimonials.map((testimonial: Testimonial) => ({
    ...testimonial,
    createdAt: testimonial.createdAt instanceof Date ? testimonial.createdAt.toISOString() : testimonial.createdAt,
    updatedAt: testimonial.updatedAt instanceof Date ? testimonial.updatedAt.toISOString() : testimonial.updatedAt,
  }))
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Testimoni Klien
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Typography color="white">Testimoni</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <Grid container spacing={4}>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial: Testimonial) => (
                <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Quote size={60} className="text-blue-100 absolute -top-4 -left-4 opacity-50" />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, position: "relative", zIndex: 1 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          overflow: "hidden",
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={testimonial.image || "/placeholder.svg?height=60&width=60"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3, position: "relative", zIndex: 1 }}>
                      <Rating value={testimonial.rating} readOnly precision={0.5} />
                    </Box>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        fontStyle: "italic",
                        flexGrow: 1,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ position: "relative", zIndex: 1 }}>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Belum ada testimoni yang tersedia.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Suspense>

        <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Bagikan Pengalaman Anda
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 700, mx: "auto" }}>
            Kami sangat menghargai umpan balik dari klien kami. Jika Anda telah menggunakan layanan kami, silakan
            bagikan pengalaman Anda dengan mengisi formulir di bawah ini.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <TestimonialForm />
        </Box>
      </Container>

      <Footer />
    </main>
  )
}

