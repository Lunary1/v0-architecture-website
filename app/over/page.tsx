import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AboutHero from "@/components/about-hero";
import AboutContent from "@/components/about-content";
import TeamSection from "@/components/team-section";
import type { Metadata } from "next";

const SITE_URL = "https://www.architect-kindt.be";

export const metadata: Metadata = {
  title: "Over Ons | Architectenbureau Paul Kindt",
  description:
    "Ontdek ons verhaal, missie, en het team achter Architectenbureau Paul Kindt.",
  alternates: {
    canonical: `${SITE_URL}/over`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/over`,
    title: "Over Ons | Architectenbureau Paul Kindt",
    description:
      "Ontdek ons verhaal, missie, en het team achter Architectenbureau Paul Kindt.",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <AboutHero />
      <TeamSection />
      <AboutContent />
      <Footer />
    </main>
  );
}
