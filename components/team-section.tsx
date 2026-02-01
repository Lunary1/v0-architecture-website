interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Paul Kindt",
    role: "Zaakvoerder & Hoofd Architect",
    bio: "25+ years in architecture with expertise in residential design",
    image: "/paul.png",
  },
  {
    id: "team-2",
    name: "Tim Adams",
    role: "Architect",
    bio: "Award-winning designer specializing in interior spaces",
    image: "/tim.jpg",
  },
  {
    id: "team-3",
    name: "Caroline",
    role: "Technisch Tekenaar",
    bio: "Industrial design expert with focus on sustainable solutions",
    image: "/industrial-architect-portrait.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-light tracking-widest text-muted-foreground mb-4">
            ONS TEAM
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Ontmoet het team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <div className="bg-muted h-96 mb-4 overflow-hidden rounded-sm">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-1">{member.name}</h3>
              <p className="text-sm font-light text-muted-foreground mb-3">
                {member.role}
              </p>
              <p className="text-sm font-light text-foreground/70 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
