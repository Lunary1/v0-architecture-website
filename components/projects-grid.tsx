"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  category: string
  image: string
  location: string
  year: number
}

const allProjects: Project[] = [
  {
    id: "residence-01",
    title: "Minimalist Villa",
    category: "Residentieel Modern",
    image: "/minimalist-villa-architecture.jpg",
    location: "Amsterdam",
    year: 2023,
  },
  {
    id: "residence-02",
    title: "Classic Estate",
    category: "Residentieel Klassiek",
    image: "/classic-residential-design.jpg",
    location: "Utrecht",
    year: 2023,
  },
  {
    id: "industrial-01",
    title: "Office Complex",
    category: "Kantoor & Industriebouw",
    image: "/modern-office-building.png",
    location: "Rotterdam",
    year: 2022,
  },
  {
    id: "interior-01",
    title: "Interior Design",
    category: "Interieur",
    image: "/luxury-interior-design.jpg",
    location: "The Hague",
    year: 2022,
  },
  {
    id: "residence-03",
    title: "Luxury Townhouse",
    category: "Residentieel Modern",
    image: "/luxury-townhouse-architecture.jpg",
    location: "Amsterdam",
    year: 2023,
  },
  {
    id: "industrial-02",
    title: "Manufacturing Hub",
    category: "Kantoor & Industriebouw",
    image: "/manufacturing-industrial-building.jpg",
    location: "Eindhoven",
    year: 2021,
  },
  {
    id: "interior-02",
    title: "Corporate Office",
    category: "Interieur",
    image: "/corporate-office-interior.jpg",
    location: "Amsterdam",
    year: 2023,
  },
  {
    id: "residence-04",
    title: "Contemporary Home",
    category: "Residentieel Klassiek",
    image: "/contemporary-home-design.jpg",
    location: "Groningen",
    year: 2022,
  },
]

const categories = [
  "Alle Projecten",
  "Residentieel Modern",
  "Residentieel Klassiek",
  "Kantoor & Industriebouw",
  "Interieur",
]

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("Alle Projecten")

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Alle Projecten") {
      return allProjects
    }
    return allProjects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-gray-600 mb-4">ALLE PROJECTEN</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Ons volledige portfolio</h1>
          <p className="text-lg font-light text-gray-600 max-w-2xl">
            Verken ons uitgebreide portfolio van residentiële, industriële en interieurprojecten
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-light tracking-wide transition ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "border border-gray-300 text-black hover:border-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Count */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <p className="text-sm font-light text-gray-600">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projecten"}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projecten/${project.id}`} className="group cursor-pointer">
              <div className="relative h-96 md:h-80 overflow-hidden bg-gray-100 mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-light tracking-widest text-gray-600">{project.category}</p>
                  <p className="text-xs font-light text-gray-600">{project.year}</p>
                </div>
                <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-gray-600">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-light text-gray-600">Geen projecten gevonden in deze categorie</p>
          </div>
        )}
      </div>
    </section>
  )
}
