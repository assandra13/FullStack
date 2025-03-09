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
import type { BlogPost } from "@/types/prisma"

export default async function AdminBlogPage() {
  const blogPosts = (await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as BlogPost[]

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Kelola Blog
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tambah, edit, dan hapus artikel blog.
          </Typography>
        </Box>
        <Link href="/admin/blog/new" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Tambah Artikel
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Penulis</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <TableRow key={post.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Chip
                      label={post.published ? "Dipublikasikan" : "Draft"}
                      color={post.published ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/blog/${post.id}`} style={{ textDecoration: "none" }}>
                      <Button size="small" color="primary" sx={{ mr: 1 }}>
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/${post.id}/delete`} style={{ textDecoration: "none" }}>
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
                  Belum ada artikel blog. Klik "Tambah Artikel" untuk membuat artikel baru.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

