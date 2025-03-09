// Definisi tipe untuk model-model Prisma
export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    category: string
    image?: string | null
    published: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }
  
  export interface GalleryItem {
    id: string
    title: string
    location: string
    price: string
    category: string
    description?: string | null
    image?: string | null
    published: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }
  
  export interface Testimonial {
    id: string
    name: string
    role: string
    content: string
    rating: number
    image?: string | null
    approved: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }
  
  export interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date | string
    updatedAt: Date | string
  }
  
  