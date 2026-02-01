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
    bio: "Met meer dan 25 jaar ervaring ontwerpt Paul residentiële architectuur met aandacht voor context, functionaliteit en detail.",
    image: "/placeholder.svg",
  },
  {
    id: "team-2",
    name: "Tim Adams",
    role: "Architect",
    bio: "Als architect werkt Tim mee aan uiteenlopende projecten binnen het bureau, met aandacht voor ontwerp, uitwerking en opvolging.",
    image: "/placeholder.svg",
  },
  {
    id: "team-3",
    name: "Caroline",
    role: "Technisch Tekenaar",
    bio: "Caroline is technisch tekenaar en vormt al jaren een vaste waarde binnen het bureau. Ze staat in voor de technische uitwerking en ondersteuning van de projecten.",
    image: "/placeholder.svg",
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

        {/* Featured Member - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-muted h-96 overflow-hidden rounded-sm">
            <img
              src={teamMembers[0].image || "/placeholder.svg"}
              alt={teamMembers[0].name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-light mb-2">{teamMembers[0].name}</h3>
            <p className="text-base font-light text-muted-foreground mb-6">
              {teamMembers[0].role}
            </p>
            <p className="text-base font-light text-foreground/70 leading-relaxed">
              {teamMembers[0].bio}
            </p>
          </div>
        </div>

        {/* Other Team Members - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.slice(1).map((member) => (
            <div key={member.id}>
              <div className="bg-muted h-72 mb-6 overflow-hidden rounded-sm">
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
