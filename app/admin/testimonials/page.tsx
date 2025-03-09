import Link from "next/link"
import prisma from "@/lib/db"
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Rating,
} from "@mui/material"
import type { Testimonial } from "@/types/prisma"

export default async function AdminTestimonialsPage() {
  const testimonials = (await prisma.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as Testimonial[]

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kelola Testimoni
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Tinjau dan kelola testimoni dari pengguna.
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Pekerjaan</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial: Testimonial) => (
                <TableRow key={testimonial.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {testimonial.name}
                  </TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <Rating value={testimonial.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={testimonial.approved ? "Disetujui" : "Menunggu"}
                      color={testimonial.approved ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(testimonial.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/testimonials/${testimonial.id}`} style={{ textDecoration: "none" }}>
                      <Button size="small" color="primary" sx={{ mr: 1 }}>
                        {testimonial.approved ? "Edit" : "Tinjau"}
                      </Button>
                    </Link>
                    <Link href={`/admin/testimonials/${testimonial.id}/delete`} style={{ textDecoration: "none" }}>
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
                  Belum ada testimoni yang dikirimkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

