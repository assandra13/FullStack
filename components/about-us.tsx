"use client"

import { motion } from "framer-motion"
import { Check, Award, Users, Home } from "lucide-react"
import Image from "next/image"

export default function AboutUs() {
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
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Tentang Kami
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
            BrickProperty adalah perusahaan properti terkemuka yang berfokus pada penyediaan solusi properti terbaik
            untuk kebutuhan Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=500&width=600" alt="Our Team" fill className="object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-300 rounded-xl opacity-70 z-0"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-xl opacity-30 z-0"></div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h3>
              <p className="text-gray-700">
                Dengan pengalaman lebih dari 10 tahun di industri properti, kami telah membantu ribuan klien menemukan
                properti impian mereka. Kami berkomitmen untuk memberikan layanan terbaik dengan integritas dan
                profesionalisme.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-gray-50 p-5 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-700 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-700">Properti Terjual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-gray-700">Klien Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-700">Kota</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-gray-700">Tahun Pengalaman</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

