"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Box, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Grid, Divider, CircularProgress, Alert } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
    published: false,
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load blog post data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Error updating blog post:", error);
      setError("Failed to update blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            Edit Artikel Blog
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Perbarui artikel blog yang sudah ada.
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
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField fullWidth required label="Judul Artikel" name="title" value={formData.title} onChange={handleChange} margin="normal" />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Kategori</InputLabel>
                <Select labelId="category-label" id="category" name="category" value={formData.category} onChange={handleSelectChange} label="Kategori">
                  <MenuItem value="">Pilih Kategori</MenuItem>
                  <MenuItem value="Tips & Trik">Tips & Trik</MenuItem>
                  <MenuItem value="Investasi">Investasi</MenuItem>
                  <MenuItem value="Desain">Desain</MenuItem>
                  <MenuItem value="Properti">Properti</MenuItem>
                  <MenuItem value="Lainnya">Lainnya</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth required label="Ringkasan" name="excerpt" value={formData.excerpt} onChange={handleChange} margin="normal" multiline rows={2} helperText="Ringkasan singkat artikel (akan ditampilkan di halaman utama)" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth required label="Konten Artikel" name="content" value={formData.content} onChange={handleChange} margin="normal" multiline rows={10} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth required label="Penulis" name="author" value={formData.author} onChange={handleChange} margin="normal" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL Gambar (Opsional)"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                margin="normal"
                helperText="Masukkan URL gambar untuk artikel (jika tidak diisi, akan menggunakan gambar default)"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox checked={formData.published} onChange={handleChange} name="published" color="primary" />} label="Publikasikan artikel" />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Link href="/admin/blog" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Batal</Button>
            </Link>
            <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={<SaveIcon />}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
