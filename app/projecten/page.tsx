import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProjectsGrid from "@/components/projects-grid";
import { fetchProjects, fetchCategories } from "@/lib/strapi";

export const metadata = {
  title: "Projecten | Studio Architecten",
  description:
    "Bekijk onze volledige portfolio van residentiële, industriële en interieur projecten.",
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    fetchProjects(),
    fetchCategories(),
  ]);

  return (
    <main className="bg-white text-black">
      <Navigation />
      <div className="pt-32" />
      <ProjectsGrid projects={projects} categories={categories} />
      <Footer />
    </main>
  );
}
