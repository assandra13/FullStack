"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="relative pt-20 overflow-hidden">
      {/* Background with blue and yellow gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-yellow-300 opacity-10 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              Solusi Properti Terbaik
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Temukan Properti Impian Anda Bersama Kami
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              Kami membantu Anda menemukan properti terbaik dengan harga terjangkau dan lokasi strategis di seluruh
              Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-center font-medium transition-colors"
              >
                Konsultasi Gratis
              </Link>
              <Link
                href="#gallery"
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-8 py-3 rounded-full text-center font-medium transition-colors"
              >
                Lihat Properti
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={`Client ${i}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="font-bold">500+ Klien Puas</div>
                <div className="text-sm text-gray-600">Di seluruh Indonesia</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/placeholder.svg?height=500&width=600" alt="Modern Property" fill className="object-cover" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">Rumah Modern</h3>
                    <p className="text-gray-700">Jakarta Selatan</p>
                  </div>
                  <div className="text-blue-600 font-bold">Rp 2.5M</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full opacity-70 z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500 rounded-full opacity-20 z-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

