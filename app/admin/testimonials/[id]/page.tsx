import prisma from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Typography, Box, Paper, Grid, Divider, Chip, Button, Rating, Card, CardContent, Avatar } from "@mui/material"
import TestimonialApprovalForm from "./approval-form"

export default async function TestimonialDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  })

  if (!testimonial) {
    notFound()
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Detail Testimoni
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tinjau dan kelola testimoni dari pengguna.
          </Typography>
        </Box>
        <Link href="/admin/testimonials" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Kembali ke Daftar</Button>
        </Link>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={0}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" component="h2" align="center" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                  {testimonial.role}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Rating value={testimonial.rating} readOnly />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip
                    label={testimonial.approved ? "Disetujui" : "Menunggu Persetujuan"}
                    color={testimonial.approved ? "success" : "warning"}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Tanggal Dibuat
                  </Typography>
                  <Typography variant="body2">{new Date(testimonial.createdAt).toLocaleDateString()}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Testimoni
              </Typography>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.default" }}>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "{testimonial.content}"
                </Typography>
              </Paper>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Tindakan
              </Typography>
              <TestimonialApprovalForm testimonial={testimonial} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

