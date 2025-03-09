"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Typography, Box, Paper, Button, CircularProgress, Alert, Divider, Rating } from "@mui/material"
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from "@mui/icons-material"

export default function DeleteTestimonial({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [testimonial, setTestimonial] = useState<any>(null)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/testimonials/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch testimonial")
        }

        const data = await response.json()
        setTestimonial(data)
      } catch (error) {
        console.error("Error fetching testimonial:", error)
        setError("Failed to load testimonial data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonial()
  }, [params.id])

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const response = await fetch(`/api/testimonials/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete testimonial")
      }

      router.push("/admin/testimonials")
      router.refresh()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      setError("Failed to delete testimonial. Please try again.")
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Hapus Testimoni
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Konfirmasi penghapusan testimoni.
          </Typography>
        </Box>
        <Link href="/admin/testimonials" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Kembali ke Daftar
          </Button>
        </Link>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Apakah Anda yakin ingin menghapus testimoni ini? Tindakan ini tidak dapat dibatalkan.
        </Alert>

        {testimonial && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {testimonial.role}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={testimonial.rating} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({testimonial.rating}/5)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ fontStyle: "italic" }}>
              "{testimonial.content}"
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Link href="/admin/testimonials" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Batal</Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            {isDeleting ? "Menghapus..." : "Hapus Testimoni"}
          </Button>
        </Box>
      </Paper>
    </>
  )
}

