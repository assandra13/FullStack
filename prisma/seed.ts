import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, "seed.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(";")
      .map((statement) => statement.trim())
      .filter((statement) => statement.length > 0);

    // Create admin user (password: admin123)
    const hashedPassword = await hash("admin123", 10);

    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@brickproperty.com" },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: "cluser123456789",
          name: "Admin",
          email: "admin@brickproperty.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Create sample blog posts
    const existingBlogPosts = await prisma.blogPost.findMany();
    if (existingBlogPosts.length === 0) {
      await prisma.blogPost.createMany({
        data: [
          {
            id: "blgpost1",
            title: "Tips Membeli Rumah Pertama",
            excerpt: "Panduan lengkap untuk pemula yang ingin membeli rumah pertama mereka.",
            content:
              "Membeli rumah pertama bisa menjadi pengalaman yang menantang sekaligus menyenangkan. Artikel ini akan membahas langkah-langkah penting yang perlu Anda ketahui sebelum membeli rumah pertama Anda. Mulai dari persiapan finansial, mencari lokasi yang tepat, hingga proses negosiasi dan penyelesaian transaksi.",
            author: "Budi Santoso",
            category: "Tips & Trik",
            image: "/placeholder.svg?height=200&width=400",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "blgpost2",
            title: "Investasi Properti di Tahun 2023",
            excerpt: "Tren dan peluang investasi properti yang menjanjikan di tahun 2023.",
            content:
              "Pasar properti terus berkembang dan tahun 2023 membawa peluang baru bagi investor. Artikel ini menganalisis tren pasar properti terkini, area potensial untuk investasi, dan strategi untuk memaksimalkan pengembalian investasi Anda di sektor properti.",
            author: "Diana Putri",
            category: "Investasi",
            image: "/placeholder.svg?height=200&width=400",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });
      console.log("Sample blog posts created");
    } else {
      console.log("Blog posts already exist");
    }

    // Create sample gallery items
    const existingGalleryItems = await prisma.galleryItem.findMany();
    if (existingGalleryItems.length === 0) {
      await prisma.galleryItem.createMany({
        data: [
          {
            id: "galitem1",
            title: "Rumah Minimalis 2 Lantai",
            location: "Jakarta Selatan",
            price: "Rp 2.5M",
            category: "house",
            description: "Rumah minimalis modern dengan 4 kamar tidur, 3 kamar mandi, ruang keluarga luas, dan taman belakang yang asri.",
            image: "/placeholder.svg?height=300&width=400",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "galitem2",
            title: "Apartemen Mewah CBD",
            location: "Jakarta Pusat",
            price: "Rp 1.8M",
            category: "apartment",
            description: "Apartemen mewah di pusat bisnis dengan fasilitas lengkap: kolam renang, gym, sauna, dan keamanan 24 jam.",
            image: "/placeholder.svg?height=300&width=400",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "galitem3",
            title: "Ruko Strategis",
            location: "Bandung",
            price: "Rp 3.2M",
            category: "commercial",
            description: "Ruko 3 lantai di lokasi strategis dengan lalu lintas tinggi, cocok untuk berbagai jenis usaha.",
            image: "/placeholder.svg?height=300&width=400",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });
      console.log("Sample gallery items created");
    } else {
      console.log("Gallery items already exist");
    }

    // Create sample testimonials
    const existingTestimonials = await prisma.testimonial.findMany();
    if (existingTestimonials.length === 0) {
      await prisma.testimonial.createMany({
        data: [
          {
            id: "testim1",
            name: "Ahmad Rizki",
            role: "Pengusaha",
            content: "BrickProperty membantu saya menemukan properti investasi yang sangat menguntungkan. Tim mereka sangat profesional dan memahami kebutuhan saya.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
            approved: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "testim2",
            name: "Siti Nurhaliza",
            role: "Dokter",
            content: "Proses pembelian rumah pertama saya berjalan lancar berkat bantuan dari tim BrickProperty. Mereka memberikan saran yang sangat berharga.",
            rating: 4,
            image: "/placeholder.svg?height=80&width=80",
            approved: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "testim3",
            name: "Rudi Hartono",
            role: "Dosen",
            content: "Saya sangat puas dengan layanan BrickProperty. Mereka membantu saya menemukan rumah impian dengan harga yang sesuai budget.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
            approved: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });
      console.log("Sample testimonials created");
    } else {
      console.log("Testimonials already exist");
    }

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
