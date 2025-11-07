import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import NewsGrid from "@/components/news-grid"

export const metadata = {
  title: "Nieuws & Pers | Studio Architecten",
  description: "Ontdek het laatste nieuws, persberichten en media coverage van Studio Architecten.",
}

export default function NewsPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <div className="pt-32" />
      <NewsGrid />
      <Footer />
    </main>
  )
}
