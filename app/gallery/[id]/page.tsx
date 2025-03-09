import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import prisma from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Typography, Container, Box, Breadcrumbs, Divider, Paper, Grid, Button } from "@mui/material"
import { MapPin, Maximize2, BedDouble, Bath, Car, Phone } from "lucide-react"
import type { GalleryItem } from "@/types/prisma"

async function getGalleryItem(id: string) {
  const galleryItem = await prisma.galleryItem.findUnique({
    where: {
      id,
      published: true,
    },
  })

  if (!galleryItem) {
    return null
  }

  return galleryItem as GalleryItem
}

async function getSimilarItems(category: string, currentId: string) {
  const similarItems = (await prisma.galleryItem.findMany({
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
  })) as GalleryItem[]

  return similarItems
}

export default async function GalleryItemPage({ params }: { params: { id: string } }) {
  const galleryItem = await getGalleryItem(params.id)

  if (!galleryItem) {
    notFound()
  }

  const similarItems = await getSimilarItems(galleryItem.category, galleryItem.id)

  // Mock property details
  const propertyDetails = {
    size: "150m²",
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    yearBuilt: 2022,
    type: galleryItem.category === "house" ? "Rumah" : galleryItem.category === "apartment" ? "Apartemen" : "Komersial",
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            {galleryItem.title}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Link href="/gallery" className="text-white hover:text-gray-200">
              Galeri
            </Link>
            <Typography color="white">{galleryItem.title}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ position: "relative", height: 500, borderRadius: 2, overflow: "hidden", mb: 4 }}>
              <Image
                src={galleryItem.image || `/placeholder.svg?height=500&width=800&text=Property`}
                alt={galleryItem.title}
                fill
                className="object-cover"
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                {galleryItem.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, color: "text.secondary" }}>
                <MapPin size={20} />
                <Typography variant="body1">{galleryItem.location}</Typography>
              </Box>
              <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
                {galleryItem.price}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h5" gutterBottom>
              Deskripsi Properti
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
              {galleryItem.description || "Tidak ada deskripsi tersedia untuk properti ini."}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Detail Properti
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Maximize2 size={24} className="text-blue-600 mb-2" />
                  <Typography variant="body2" color="text.secondary">
                    Luas
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.size}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <BedDouble size={24} className="text-blue-600 mb-2" />
                  <Typography variant="body2" color="text.secondary">
                    Kamar Tidur
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.bedrooms}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Bath size={24} className="text-blue-600 mb-2" />
                  <Typography variant="body2" color="text.secondary">
                    Kamar Mandi
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.bathrooms}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Car size={24} className="text-blue-600 mb-2" />
                  <Typography variant="body2" color="text.secondary">
                    Garasi
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.garage}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tipe
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.type}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tahun Dibangun
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {propertyDetails.yearBuilt}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Hubungi Agen
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
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
                  <Image src="/placeholder.svg?height=60&width=60" alt="Agent" fill className="object-cover" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Budi Santoso
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Senior Property Agent
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" fullWidth startIcon={<Phone size={18} />} sx={{ mb: 2 }}>
                +62 812 3456 7890
              </Button>
              <Button variant="outlined" fullWidth>
                Kirim Pesan
              </Button>
            </Paper>

            {similarItems.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Properti Serupa
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {similarItems.map((item: GalleryItem) => (
                  <Box
                    key={item.id}
                    sx={{
                      mb: 3,
                      pb: 3,
                      borderBottom: "1px solid #eee",
                      "&:last-child": { mb: 0, pb: 0, borderBottom: "none" },
                    }}
                  >
                    <Link href={`/gallery/${item.id}`} className="group">
                      <Box sx={{ position: "relative", height: 120, borderRadius: 1, overflow: "hidden", mb: 2 }}>
                        <Image
                          src={item.image || `/placeholder.svg?height=120&width=240&text=Property`}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Box>
                      <Typography variant="subtitle1" className="group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          {item.location}
                        </Typography>
                        <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                          {item.price}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </main>
  )
}

