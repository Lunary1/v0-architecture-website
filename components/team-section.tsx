interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Jan de Vries",
    role: "Founder & Principal Architect",
    bio: "25+ years in architecture with expertise in residential design",
    image: "/professional-architect-portrait.jpg",
  },
  {
    id: "team-2",
    name: "Sarah Müller",
    role: "Design Director",
    bio: "Award-winning designer specializing in interior spaces",
    image: "/interior-designer-portrait.jpg",
  },
  {
    id: "team-3",
    name: "Marco Rossi",
    role: "Senior Architect",
    bio: "Industrial design expert with focus on sustainable solutions",
    image: "/industrial-architect-portrait.jpg",
  },
  {
    id: "team-4",
    name: "Emma Janssen",
    role: "Project Manager",
    bio: "Ensures seamless project delivery and client satisfaction",
    image: "/project-manager-portrait.jpg",
  },
]

export default function TeamSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-gray-600 mb-4">ONS TEAM</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Ontmoet het team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <div className="bg-gray-200 h-64 mb-4 overflow-hidden rounded-sm">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-1">{member.name}</h3>
              <p className="text-sm font-light text-gray-600 mb-3">{member.role}</p>
              <p className="text-sm font-light text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
