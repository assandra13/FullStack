import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Typography, Container, Grid, Card, CardContent, CardMedia, Box, Breadcrumbs, Pagination } from "@mui/material"
import { MapPin } from "lucide-react"
import type { GalleryItem } from "@/types/prisma"

// Fungsi untuk mengambil data galeri dari database
async function getGalleryItems(): Promise<GalleryItem[]> {
  const galleryItems = await prisma.galleryItem.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Konversi Date ke string untuk menghindari error serialisasi
  return galleryItems.map((item) => ({
    ...item,
    createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
    updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
    image: item.image ?? "/placeholder.svg?height=300&width=400&text=Property", // Pastikan tidak null
  }))
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Galeri Properti
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Typography color="white">Galeri</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Suspense fallback={<div>Loading gallery items...</div>}>
          <Grid container spacing={4}>
            {galleryItems.length > 0 ? (
              galleryItems.map((item: GalleryItem) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3 }}>
                    {/* Image Section */}
                    <CardMedia component="div" sx={{ pt: "75%", position: "relative" }}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "primary.main",
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 5,
                          fontSize: "0.75rem",
                          fontWeight: "medium",
                        }}
                      >
                        {item.category === "house"
                          ? "Rumah"
                          : item.category === "apartment"
                          ? "Apartemen"
                          : "Komersial"}
                      </Box>
                    </CardMedia>

                    {/* Card Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2, color: "text.secondary" }}>
                        <MapPin size={16} />
                        <Typography variant="body2">{item.location}</Typography>
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                        </Typography>
                      )}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                          {item.price}
                        </Typography>
                        <Link
                          href={`/gallery/${item.id}`}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Detail
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Belum ada properti yang tersedia.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Pagination */}
          {galleryItems.length > 0 && (
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
