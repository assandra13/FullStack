import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Typography, Container, Box, Breadcrumbs, Grid, Paper } from "@mui/material"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Contact from "@/components/contact"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Kontak Kami
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Typography color="white">Kontak</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Informasi Kontak
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Hubungi kami untuk konsultasi gratis atau informasi lebih lanjut tentang properti. Tim kami siap
                membantu Anda menemukan properti impian.
              </Typography>

              <Box sx={{ mt: 4, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone className="text-primary" size={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Telepon
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +62 21 1234 5678
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail className="text-primary" size={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@brickproperty.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin className="text-primary" size={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Alamat
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jl. Sudirman No. 123, Jakarta Selatan, Indonesia
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Clock className="text-primary" size={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Jam Operasional
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Senin - Jumat: 09:00 - 17:00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sabtu: 09:00 - 15:00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Minggu: Tutup
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Kirim Pesan
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Isi formulir di bawah ini untuk mengirim pesan kepada kami. Kami akan segera menghubungi Anda.
              </Typography>

              <Contact />
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", height: 450 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904144587335!2d106.82796841476884!3d-6.227483395493402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e8708c5825%3A0xab8c6618360de8!2sJl.%20Jend.%20Sudirman%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1646209056576!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="BrickProperty Location"
            ></iframe>
          </Paper>
        </Box>
      </Container>

      <Footer />
    </main>
  )
}

