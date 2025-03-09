"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Definisikan tipe data Post
interface Post {
  id: string;
  image?: string | null; // Memperbolehkan null agar tidak error
  title: string;
  category: string;
  createdAt: string;
  excerpt: string;
  author: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts = [] }: BlogProps) {
  // Ubah nilai null pada image menjadi undefined agar cocok dengan Next/Image
  const sanitizedPosts = posts.map((post) => ({
    ...post,
    image: post.image ?? undefined, // Ubah null menjadi undefined
  }));

  return (
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Blog & Artikel
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-700 text-lg"
          >
            Temukan tips, trik, dan informasi terbaru seputar properti di blog kami.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sanitizedPosts.length > 0 ? (
            sanitizedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image || `/placeholder.svg?height=200&width=400&text=Blog`} // Placeholder jika image kosong
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                        <Image src={`/placeholder.svg?height=32&width=32`} alt={post.author} width={32} height={32} />
                      </div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">Belum ada artikel blog yang tersedia.</div>
          )}
        </div>

        {sanitizedPosts.length > 0 && (
          <div className="text-center mt-12">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-8 py-3 rounded-full text-center font-medium transition-colors"
            >
              Lihat Semua Artikel
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
