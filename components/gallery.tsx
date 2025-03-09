"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type PropertyItem = {
  id: string
  title: string
  image: string
  category: "house" | "apartment" | "commercial"
  location: string
  price: string
}

interface GalleryProps {
  items: PropertyItem[]
}

export default function Gallery({ items = [] }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Semua" },
    { id: "house", name: "Rumah" },
    { id: "apartment", name: "Apartemen" },
    { id: "commercial", name: "Komersial" },
  ]

  const filteredItems = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory)

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Galeri Properti
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
            Jelajahi koleksi properti eksklusif kami yang tersebar di berbagai lokasi strategis.
          </motion.p>
        </div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={item.image || `/placeholder.svg?height=300&width=400&text=Property`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category === "house" ? "Rumah" : item.category === "apartment" ? "Apartemen" : "Komersial"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {item.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-600 font-bold text-lg">{item.price}</div>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">
              Tidak ada properti yang tersedia untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
