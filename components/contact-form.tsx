"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <section className="px-6 py-12 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-light tracking-tight mb-12">Stuur ons een bericht</h2>

        {submitted ? (
          <div className="bg-secondary border border-border p-8">
            <p className="text-lg font-light mb-2">Dank u wel voor uw bericht!</p>
            <p className="font-light text-muted-foreground">
              We zullen zo snel mogelijk contact met u opnemen. Wij stellen uw interesse in Studio Architecten zeer op
              prijs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Naam *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
                placeholder="Uw naam"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">E-mailadres *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
                placeholder="uw@email.com"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Bedrijf</label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
                placeholder="Uw bedrijfsnaam"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Telefoonnummer</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
                placeholder="+31 (0)20 123 4567"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Soort project *</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
              >
                <option value="">Selecteer een optie</option>
                <option value="residential">Residentieel</option>
                <option value="industrial">Industrieel</option>
                <option value="interior">Interieur</option>
                <option value="mixed">Gemengd</option>
                <option value="other">Overig</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Budget bereik</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring"
              >
                <option value="">Selecteer budget</option>
                <option value="0-100k">€0 - €100.000</option>
                <option value="100k-500k">€100.000 - €500.000</option>
                <option value="500k-1m">€500.000 - €1.000.000</option>
                <option value="1m+">€1.000.000+</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">Bericht *</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-none px-4 py-3 font-light focus:outline-none focus:border-ring min-h-32"
                placeholder="Vertel ons over uw project..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground px-8 py-3 font-light tracking-wide hover:bg-primary/90 transition disabled:opacity-50"
              >
                {loading ? "Verzenden..." : "Bericht versturen"}
              </Button>
            </div>

            {/* Note */}
            <p className="text-xs font-light text-muted-foreground pt-4">
              We zullen uw gegevens vertrouwelijk behandelen conform onze privacybeleid.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
