"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Galeri", href: "#gallery" },
    { name: "Blog", href: "#blog" },
    { name: "Testimoni", href: "#testimonials" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BrickProperty
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {session ? (
              <Link
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {session ? (
              <Link
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

