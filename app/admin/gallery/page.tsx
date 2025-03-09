import Link from "next/link"
import prisma from "@/lib/db"
import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import type { GalleryItem } from "@/types/prisma"

export default async function AdminGalleryPage() {
  const galleryItems = (await prisma.galleryItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as GalleryItem[]

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Kelola Galeri
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tambah, edit, dan hapus item galeri properti.
          </Typography>
        </Box>
        <Link href="/admin/gallery/new" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Tambah Properti
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Properti</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    {item.category === "house" ? "Rumah" : item.category === "apartment" ? "Apartemen" : "Komersial"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.published ? "Dipublikasikan" : "Draft"}
                      color={item.published ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/gallery/${item.id}`} style={{ textDecoration: "none" }}>
                      <Button size="small" color="primary" sx={{ mr: 1 }}>
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/gallery/${item.id}/delete`} style={{ textDecoration: "none" }}>
                      <Button size="small" color="error">
                        Hapus
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Belum ada item galeri. Klik "Tambah Properti" untuk menambahkan properti baru.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

