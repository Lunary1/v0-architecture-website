"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-background">
      <div className="max-w-lg mx-auto lg:mx-0">
        <h2 className="text-2xl font-light tracking-tight mb-8">
          Stuur ons een bericht
        </h2>

        {submitted ? (
          <div className="bg-secondary/50 border border-border p-8 rounded-sm">
            <p className="text-lg font-light mb-2">
              Dank u wel voor uw bericht!
            </p>
            <p className="font-light text-muted-foreground">
              We zullen zo snel mogelijk contact met u opnemen. Wij stellen uw
              interesse in Studio Architecten zeer op prijs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Naam *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition"
                placeholder="Uw naam"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                E-mailadres *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition"
                placeholder="uw@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-light text-muted-foreground mb-2">
                  Telefoon
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-background border border-input rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition"
                  placeholder="+32 470 12 34 56"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Bericht *
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-background border border-input rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition min-h-32 resize-none"
                placeholder="Vertel ons over uw project..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-primary text-primary-foreground px-12 py-3 font-light tracking-wide hover:bg-primary/90 transition disabled:opacity-50 rounded-sm"
              >
                {loading ? "Verzenden..." : "Bericht versturen"}
              </Button>
            </div>

            {/* Note */}
            <p className="text-xs font-light text-muted-foreground pt-2">
              * Verplichte velden. We behandelen uw gegevens vertrouwelijk
              conform ons privacybeleid.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
