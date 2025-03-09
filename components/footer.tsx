"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">BrickProperty</h3>
            <p className="text-blue-200">
              Solusi properti terbaik untuk kebutuhan Anda. Kami membantu Anda menemukan properti impian dengan harga
              terjangkau.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-blue-200 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-blue-200 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-blue-200 hover:text-white transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-blue-200 hover:text-white transition-colors">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-blue-200 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Jual Properti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Beli Properti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Sewa Properti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Konsultasi Properti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Investasi Properti
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <span className="text-blue-200">Jl. Sudirman No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">info@brickproperty.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200"
        >
          <p>&copy; {new Date().getFullYear()} BrickProperty. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

