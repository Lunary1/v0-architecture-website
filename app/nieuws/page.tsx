import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NewsGrid from "@/components/news-grid";

export const metadata = {
  title: "Nieuws & Pers | Architectenbureau Paul Kindt",
  description:
    "Ontdek het laatste nieuws, persberichten en media coverage van Architectenbureau Paul Kindt.",
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
