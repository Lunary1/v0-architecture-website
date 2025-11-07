"use client"

import { testimonials } from "@/lib/data"
import { useState, useEffect } from "react"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-sm font-light tracking-widest text-gray-600 mb-4">KLANTGETUIGENISSEN</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Wat onze klanten zeggen</h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="bg-white p-12 md:p-16 rounded-lg border border-gray-200">
            <div className="mb-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed">"{testimonials[currentIndex].quote}"</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-light text-base">{testimonials[currentIndex].name}</p>
                <p className="text-sm font-light text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
