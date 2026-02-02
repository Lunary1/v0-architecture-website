import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featured-projects";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import type { Metadata } from "next";

const SITE_URL = "https://www.architect-kindt.be";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <Hero />
      <FeaturedProjects />
      <TestimonialsSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
