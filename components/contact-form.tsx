"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Script from "next/script";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitTime, setFormSubmitTime] = useState<number | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Load reCAPTCHA script
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    // Prevent rapid resubmission (min 2 seconds between submissions)
    if (formSubmitTime && Date.now() - formSubmitTime < 2000) {
      setError("Gelieve even te wachten voordat u opnieuw verstuurt.");
      return;
    }

    try {
      setError(null);

      // Get reCAPTCHA token (v3 for invisible verification)
      let captchaToken = "";
      if (typeof window !== "undefined" && (window as any).grecaptcha) {
        try {
          captchaToken = await (window as any).grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
            { action: "submit" },
          );
        } catch (err) {
          console.warn(
            "reCAPTCHA token generation failed, continuing without it",
          );
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
          honeypot: honeypotRef.current?.value || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitted(true);
      reset();
      setFormSubmitTime(Date.now());
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    }
  };

  return (
    <div className="md:pl-12 py-0">
      <div>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-muted-foreground/90">
          Stuur ons een bericht
        </h2>

        {/* reCAPTCHA v3 Script */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />

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
            {/* Honeypot Field (hidden from users) */}
            <input
              ref={honeypotRef}
              type="text"
              id="website"
              style={{ display: "none" }}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />

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
              conform ons privacybeleid. Deze site is beveiligd met reCAPTCHA en{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-muted-foreground/80"
              >
                Google Privacy Policy
              </a>{" "}
              en{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-muted-foreground/80"
              >
                Terms of Service
              </a>{" "}
              van toepassing.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
