-- Seed data for BrickProperty application

-- Create admin user (password: admin123)
-- Note: In a real application, you would use bcrypt to hash the password
-- This is a pre-hashed version of "admin123" using bcrypt
INSERT INTO "User" ("id", "name", "email", "password", "createdAt", "updatedAt")
VALUES (
  'cluser123456789',
  'Admin',
  'admin@example.com',
  '$2a$10$ny2tSiwFxA.6vZyl.G/U6eKpdd8se0whIFSconxvEUNZBCd4JGOmC',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Sample blog posts
INSERT INTO "BlogPost" ("id", "title", "excerpt", "content", "author", "category", "image", "published", "createdAt", "updatedAt")
VALUES
  (
    'blgpost1',
    'Tips Membeli Rumah Pertama',
    'Panduan lengkap untuk pemula yang ingin membeli rumah pertama mereka.',
    'Membeli rumah pertama bisa menjadi pengalaman yang menantang sekaligus menyenangkan. Artikel ini akan membahas langkah-langkah penting yang perlu Anda ketahui sebelum membeli rumah pertama Anda. Mulai dari persiapan finansial, mencari lokasi yang tepat, hingga proses negosiasi dan penyelesaian transaksi.',
    'Budi Santoso',
    'Tips & Trik',
    '/placeholder.svg?height=200&width=400',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'blgpost2',
    'Investasi Properti di Tahun 2023',
    'Tren dan peluang investasi properti yang menjanjikan di tahun 2023.',
    'Pasar properti terus berkembang dan tahun 2023 membawa peluang baru bagi investor. Artikel ini menganalisis tren pasar properti terkini, area potensial untuk investasi, dan strategi untuk memaksimalkan pengembalian investasi Anda di sektor properti.',
    'Diana Putri',
    'Investasi',
    '/placeholder.svg?height=200&width=400',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Sample gallery items
INSERT INTO "GalleryItem" ("id", "title", "location", "price", "category", "description", "image", "published", "createdAt", "updatedAt")
VALUES
  (
    'galitem1',
    'Rumah Minimalis 2 Lantai',
    'Jakarta Selatan',
    'Rp 2.5M',
    'house',
    'Rumah minimalis modern dengan 4 kamar tidur, 3 kamar mandi, ruang keluarga luas, dan taman belakang yang asri.',
    '/placeholder.svg?height=300&width=400',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'galitem2',
    'Apartemen Mewah CBD',
    'Jakarta Pusat',
    'Rp 1.8M',
    'apartment',
    'Apartemen mewah di pusat bisnis dengan fasilitas lengkap: kolam renang, gym, sauna, dan keamanan 24 jam.',
    '/placeholder.svg?height=300&width=400',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'galitem3',
    'Ruko Strategis',
    'Bandung',
    'Rp 3.2M',
    'commercial',
    'Ruko 3 lantai di lokasi strategis dengan lalu lintas tinggi, cocok untuk berbagai jenis usaha.',
    '/placeholder.svg?height=300&width=400',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Sample testimonials
INSERT INTO "Testimonial" ("id", "name", "role", "content", "rating", "image", "approved", "createdAt", "updatedAt")
VALUES
  (
    'testim1',
    'Ahmad Rizki',
    'Pengusaha',
    'BrickProperty membantu saya menemukan properti investasi yang sangat menguntungkan. Tim mereka sangat profesional dan memahami kebutuhan saya.',
    5,
    '/placeholder.svg?height=80&width=80',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'testim2',
    'Siti Nurhaliza',
    'Dokter',
    'Proses pembelian rumah pertama saya berjalan lancar berkat bantuan dari tim BrickProperty. Mereka memberikan saran yang sangat berharga.',
    4,
    '/placeholder.svg?height=80&width=80',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'testim3',
    'Rudi Hartono',
    'Dosen',
    'Saya sangat puas dengan layanan BrickProperty. Mereka membantu saya menemukan rumah impian dengan harga yang sesuai budget.',
    5,
    '/placeholder.svg?height=80&width=80',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

