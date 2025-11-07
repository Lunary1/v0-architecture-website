import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProjectsGrid from "@/components/projects-grid"

export const metadata = {
  title: "Projecten | Studio Architecten",
  description: "Bekijk onze volledige portfolio van residentiële, industriële en interieur projecten.",
}

export default function ProjectsPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <div className="pt-32" />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
