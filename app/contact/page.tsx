import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import ContactMap from "@/components/contact-map";
import type { Metadata } from "next";

const SITE_URL = "https://www.architect-kindt.be";

export const metadata: Metadata = {
  title: "Contact | Architectenbureau Paul Kindt",
  description:
    "Neem contact op met Architectenbureau Paul Kindt voor uw architectuurproject.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: "Contact | Architectenbureau Paul Kindt",
    description:
      "Neem contact op met Architectenbureau Paul Kindt voor uw architectuurproject.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <ContactHero />
      <section className="py-24 px-6 bg-secondary/50 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x divide-border">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactMap />
      <Footer />
    </main>
  );
}
