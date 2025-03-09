import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { Typography, Container, Box, Breadcrumbs, Grid, Paper, Divider } from "@mui/material";
import { Check, Award, Users, Home, Clock, Target, Shield } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Check className="w-5 h-5 text-blue-600" />,
      title: "Properti Terverifikasi",
      description: "Semua properti kami telah melalui proses verifikasi ketat untuk memastikan kualitas terbaik.",
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: "Tim Profesional",
      description: "Didukung oleh tim profesional berpengalaman di bidang properti.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Layanan Pelanggan",
      description: "Kami menyediakan layanan pelanggan 24/7 untuk membantu Anda.",
    },
    {
      icon: <Home className="w-5 h-5 text-blue-600" />,
      title: "Pilihan Beragam",
      description: "Berbagai pilihan properti dari rumah, apartemen, hingga ruko komersial.",
    },
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Integritas",
      description: "Kami berkomitmen untuk selalu jujur dan transparan dalam setiap transaksi properti.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Kepuasan Klien",
      description: "Kepuasan klien adalah prioritas utama kami dalam memberikan layanan.",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Keamanan",
      description: "Kami memastikan keamanan dan legalitas setiap properti yang kami tawarkan.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Efisiensi",
      description: "Kami berusaha memberikan layanan yang cepat dan efisien untuk menghemat waktu Anda.",
    },
  ];

  const team = [
    {
      name: "Ahmad Rizki",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Berpengalaman lebih dari 15 tahun di industri properti dengan latar belakang di bidang arsitektur dan real estate.",
    },
    {
      name: "Siti Nurhaliza",
      role: "Chief Marketing Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ahli pemasaran dengan pengalaman lebih dari 10 tahun dalam mengembangkan strategi pemasaran properti yang efektif.",
    },
    {
      name: "Budi Santoso",
      role: "Senior Property Agent",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Agen properti berpengalaman dengan track record penjualan yang luar biasa dan pengetahuan mendalam tentang pasar properti.",
    },
    {
      name: "Diana Putri",
      role: "Customer Relations Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Spesialis hubungan pelanggan yang berdedikasi untuk memastikan kepuasan klien dan layanan terbaik.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Tentang Kami
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link href="/" className="text-white hover:text-gray-200">
              Beranda
            </Link>
            <Typography color="white">Tentang Kami</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Sejarah Kami
            </Typography>
            <Typography variant="body1" paragraph>
              BrickProperty didirikan pada tahun 2010 dengan visi untuk menjadi perusahaan properti terkemuka yang menyediakan solusi properti terbaik bagi masyarakat Indonesia. Berawal dari sebuah kantor kecil di Jakarta Selatan dengan
              hanya 5 orang karyawan, kini kami telah berkembang menjadi salah satu perusahaan properti terpercaya dengan jaringan yang luas di berbagai kota besar di Indonesia.
            </Typography>
            <Typography variant="body1" paragraph>
              Selama lebih dari satu dekade, kami telah membantu ribuan klien menemukan properti impian mereka, mulai dari rumah pertama untuk keluarga muda hingga properti investasi bagi para investor. Komitmen kami terhadap kualitas,
              integritas, dan kepuasan pelanggan telah menjadikan BrickProperty sebagai mitra terpercaya dalam perjalanan properti Anda.
            </Typography>
            <Typography variant="body1">
              Kami terus berinovasi dan mengembangkan layanan kami untuk memenuhi kebutuhan pasar yang terus berubah, dengan tetap memegang teguh nilai-nilai inti kami yaitu kejujuran, profesionalisme, dan kepuasan klien.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", height: 400, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
              <Image src="/placeholder.svg?height=400&width=600&text=Our History" alt="Sejarah BrickProperty" fill className="object-cover" />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Mengapa Memilih Kami?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
            Dengan pengalaman lebih dari 10 tahun di industri properti, kami telah membangun reputasi sebagai perusahaan properti yang terpercaya dan profesional.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 2,
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: "50%", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 6, mb: 6 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", height: 400, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <Image src="/placeholder.svg?height=400&width=600&text=Our Mission" alt="Misi BrickProperty" fill className="object-cover" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Visi & Misi
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Visi
              </Typography>
              <Typography variant="body1" paragraph>
                Menjadi perusahaan properti terkemuka yang menyediakan solusi properti terbaik dan terpercaya bagi masyarakat Indonesia.
              </Typography>

              <Typography variant="h6" color="primary" gutterBottom>
                Misi
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">Menyediakan properti berkualitas dengan harga yang kompetitif.</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">Memberikan layanan profesional dan solusi properti yang sesuai dengan kebutuhan klien.</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan dan integritas.</Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body1">Berkontribusi positif terhadap perkembangan industri properti di Indonesia.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Nilai-Nilai Kami
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
            Nilai-nilai inti yang menjadi pedoman kami dalam memberikan layanan terbaik kepada klien.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: "50%", mr: 3 }}>{value.icon}</Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 8 }} />

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Tim Kami
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
            Kenali tim profesional kami yang berdedikasi untuk membantu Anda menemukan properti impian.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <Box sx={{ position: "relative", height: 300 }}>
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", py: 4, bgcolor: "primary.light", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Siap Menemukan Properti Impian Anda?
          </Typography>
          <Typography variant="body1" paragraph>
            Hubungi kami sekarang untuk konsultasi gratis dengan tim profesional kami.
          </Typography>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors inline-block">
            Hubungi Kami
          </Link>
        </Box>
      </Container>

      <Footer />
    </main>
  );
}
