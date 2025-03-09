"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import TestimonialForm from "./testimonial-form"

// Tambahkan interface Testimonial di bagian atas file, setelah import
type Testimonial = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string | null; // Tambahkan `null` sebagai tipe yang valid
  approved: boolean;
};


// Ubah definisi prop testimonials untuk menggunakan interface
export default function Testimonials({ testimonials = [] as Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Testimoni Klien
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
            Apa kata klien kami tentang layanan BrickProperty.
          </motion.p>
        </div>

        {testimonials.length > 0 ? (
          <div className="max-w-4xl mx-auto relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                          <div>
                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </>
            )}

            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${activeIndex === index ? "bg-blue-600" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Belum ada testimoni yang tersedia.</div>
        )}

        <div className="mt-12 text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-center font-medium transition-colors"
          >
            {showForm ? "Tutup Form" : "Berikan Testimoni"}
          </motion.button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <TestimonialForm />
          </motion.div>
        )}
      </div>
    </section>
  )
}

