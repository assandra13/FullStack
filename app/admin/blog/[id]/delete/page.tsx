"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Box, Paper, Button, CircularProgress, Alert, Divider } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function DeleteBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [blogPost, setBlogPost] = useState<any>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }

        const data = await response.json();
        setBlogPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load blog post data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setError("Failed to delete blog post. Please try again.");
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
            Hapus Artikel Blog
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Konfirmasi penghapusan artikel blog.
          </Typography>
        </Box>
        <Link href="/admin/blog" style={{ textDecoration: "none" }}>
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
          Apakah Anda yakin ingin menghapus artikel blog ini? Tindakan ini tidak dapat dibatalkan.
        </Alert>

        {blogPost && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {blogPost.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Kategori: {blogPost.category} | Penulis: {blogPost.author}
            </Typography>
            <Typography variant="body1" paragraph>
              {blogPost.excerpt}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Link href="/admin/blog" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Batal</Button>
          </Link>
          <Button variant="contained" color="error" disabled={isDeleting} startIcon={<DeleteIcon />} onClick={handleDelete}>
            {isDeleting ? "Menghapus..." : "Hapus Artikel"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
