import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AboutHero from "@/components/about-hero";
import AboutContent from "@/components/about-content";
import TeamSection from "@/components/team-section";

export const metadata = {
  title: "Over Ons | Studio Architecten",
  description:
    "Ontdek onze verhaal, missie, en het team achter Studio Architecten.",
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
