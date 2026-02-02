"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitted(true);
      reset();
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    }
  };

  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-background">
      <div className="max-w-lg mx-auto lg:mx-0">
        <h2 className="text-2xl font-light tracking-tight mb-8">
          Stuur ons een bericht
        </h2>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 p-8 rounded-sm">
            <p className="text-lg font-light mb-2 text-green-900">
              Dank u wel voor uw bericht!
            </p>
            <p className="font-light text-green-800">
              We zullen zo snel mogelijk contact met u opnemen. Wij stellen uw
              interesse in Architectenbureau Paul Kindt zeer op prijs.
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-8 rounded-sm">
            <p className="text-lg font-light mb-2 text-red-900">
              Fout bij verzending
            </p>
            <p className="font-light text-red-800">{error}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Naam *
              </label>
              <Input
                type="text"
                {...register("name")}
                className={`w-full bg-background border ${
                  errors.name ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition`}
                placeholder="Uw naam"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                E-mailadres *
              </label>
              <Input
                type="email"
                {...register("email")}
                className={`w-full bg-background border ${
                  errors.email ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition`}
                placeholder="uw@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-light text-muted-foreground mb-2">
                  Telefoon
                </label>
                <Input
                  type="tel"
                  {...register("phone")}
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
                {...register("message")}
                className={`w-full bg-background border ${
                  errors.message ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-3 font-light focus:outline-none focus:border-ring transition min-h-32 resize-none`}
                placeholder="Vertel ons over uw project..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-primary text-primary-foreground px-12 py-3 font-light tracking-wide hover:bg-primary/90 transition disabled:opacity-50 rounded-sm"
              >
                {isSubmitting ? "Verzenden..." : "Bericht versturen"}
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
