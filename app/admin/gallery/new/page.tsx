"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Box, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Grid, Divider } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from "@mui/icons-material";

export default function NewGalleryItem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    category: "",
    description: "",
    image: "",
    published: false,
  });

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

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/gallery");
        router.refresh();
      } else {
        alert("Terjadi kesalahan saat menambahkan properti.");
      }
    } catch (error) {
      console.error("Error creating gallery item:", error);
      alert("Terjadi kesalahan saat menambahkan properti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Tambah Properti
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tambahkan properti baru ke galeri.
          </Typography>
        </Box>
        <Link href="/admin/gallery" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Kembali ke Daftar
          </Button>
        </Link>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth required label="Nama Properti" name="title" value={formData.title} onChange={handleChange} margin="normal" placeholder="Contoh: Rumah Modern 2 Lantai" />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Kategori</InputLabel>
                <Select labelId="category-label" id="category" name="category" value={formData.category} onChange={handleSelectChange} label="Kategori">
                  <MenuItem value="">Pilih Kategori</MenuItem>
                  <MenuItem value="house">Rumah</MenuItem>
                  <MenuItem value="apartment">Apartemen</MenuItem>
                  <MenuItem value="commercial">Komersial</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth required label="Lokasi" name="location" value={formData.location} onChange={handleChange} margin="normal" placeholder="Contoh: Jakarta Selatan" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth required label="Harga" name="price" value={formData.price} onChange={handleChange} margin="normal" placeholder="Contoh: Rp 2.5M" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Deskripsi (Opsional)" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={4} placeholder="Deskripsi lengkap properti..." />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Gambar (Opsional)"
                name="image"
                value={formData.image}
                onChange={handleChange}
                margin="normal"
                helperText="Masukkan URL gambar untuk properti (jika tidak diisi, akan menggunakan gambar default)"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox checked={formData.published} onChange={handleChange} name="published" color="primary" />} label="Publikasikan properti sekarang" />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Link href="/admin/gallery" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Batal</Button>
            </Link>
            <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={<SaveIcon />}>
              {isSubmitting ? "Menyimpan..." : "Simpan Properti"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
