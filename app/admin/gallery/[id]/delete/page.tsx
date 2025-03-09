"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Box, Paper, Button, CircularProgress, Alert, Divider } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function DeleteGalleryItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [galleryItem, setGalleryItem] = useState<any>(null);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await fetch(`/api/gallery/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch gallery item");
        }

        const data = await response.json();
        setGalleryItem(data);
      } catch (error) {
        console.error("Error fetching gallery item:", error);
        setError("Failed to load gallery item data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItem();
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/gallery/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gallery item");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      setError("Failed to delete gallery item. Please try again.");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Hapus Properti
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Konfirmasi penghapusan properti.
          </Typography>
        </Box>
        <Link href="/admin/gallery" style={{ textDecoration: "none" }}>
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
          Apakah Anda yakin ingin menghapus properti ini? Tindakan ini tidak dapat dibatalkan.
        </Alert>

        {galleryItem && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {galleryItem.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Lokasi: {galleryItem.location} | Harga: {galleryItem.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Kategori: {galleryItem.category === "house" ? "Rumah" : galleryItem.category === "apartment" ? "Apartemen" : "Komersial"}
            </Typography>
            {galleryItem.description && (
              <Typography variant="body1" paragraph>
                {galleryItem.description}
              </Typography>
            )}
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Link href="/admin/gallery" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Batal</Button>
          </Link>
          <Button variant="contained" color="error" disabled={isDeleting} startIcon={<DeleteIcon />} onClick={handleDelete}>
            {isDeleting ? "Menghapus..." : "Hapus Properti"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
