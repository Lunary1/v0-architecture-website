import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NewsGrid from "@/components/news-grid";
import type { Metadata } from "next";

const SITE_URL = "https://www.architect-kindt.be";

export const metadata: Metadata = {
  title: "Nieuws & Pers | Architectenbureau Paul Kindt",
  description:
    "Ontdek het laatste nieuws, persberichten en media coverage van Architectenbureau Paul Kindt.",
  alternates: {
    canonical: `${SITE_URL}/nieuws`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/nieuws`,
    title: "Nieuws & Pers | Architectenbureau Paul Kindt",
    description:
      "Ontdek het laatste nieuws, persberichten en media coverage van Architectenbureau Paul Kindt.",
  },
};

export default function NewsPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <NewsGrid />
      <Footer />
    </main>
  );
}
