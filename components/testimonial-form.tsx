"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TestimonialForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Terima kasih! Testimoni Anda telah dikirim dan sedang menunggu persetujuan.")
        setFormData({
          name: "",
          role: "",
          content: "",
          rating: 5,
          image: "",
        })
        router.refresh()
      } else {
        alert("Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      alert("Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Berikan Testimoni Anda</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Pekerjaan
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
              placeholder="Contoh: Pengusaha, Dokter, dll."
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            URL Foto (Opsional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
            placeholder="https://example.com/your-photo.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Masukkan URL foto Anda (jika tidak diisi, akan menggunakan foto default)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none">
                <Star
                  className={`w-6 h-6 ${star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Testimoni
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
            placeholder="Bagikan pengalaman Anda dengan BrickProperty..."
          ></textarea>
        </div>

        <div className="text-sm text-gray-500">
          <p>Testimoni Anda akan ditinjau terlebih dahulu sebelum ditampilkan di situs kami.</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Testimoni"}
        </button>
      </form>
    </div>
  )
}

