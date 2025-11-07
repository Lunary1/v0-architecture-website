// Centralized mock data for the architecture website
export const studioInfo = {
  name: "Studio Architecten",
  tagline: "Designing Tomorrow's Spaces Today",
  description:
    "A forward-thinking architecture studio specializing in contemporary residential, commercial, and industrial design.",
  headquarters: {
    name: "Amsterdam Headquarters",
    address: "Museumplein 1, 1071 DJ Amsterdam",
    phone: "+31 20 570 5700",
    hours: "Mon-Fri: 09:00 - 18:00",
  },
  office: {
    name: "Rotterdam Office",
    address: "Kop van Zuid 10, 3072 AD Rotterdam",
    phone: "+31 10 290 1100",
    hours: "Mon-Fri: 09:00 - 18:00",
  },
  email: "hello@studioarchitecten.nl",
  social: {
    instagram: "https://instagram.com/studioarchitecten",
    linkedin: "https://linkedin.com/company/studioarchitecten",
    facebook: "https://facebook.com/studioarchitecten",
  },
}

export const projectDetails: Record<
  string,
  {
    title: string
    category: string
    location: string
    year: number
    area?: string
    status: string
    description: string
    challenge: string
    solution: string
    highlights: string[]
  }
> = {
  "residence-01": {
    title: "Minimalist Villa",
    category: "Residentieel Modern",
    location: "Amsterdam",
    year: 2023,
    area: "350 m²",
    status: "Completed",
    description:
      "A stunning minimalist villa that redefines modern residential living with clean lines and open spaces.",
    challenge:
      "Creating a family home that maximizes light and space while maintaining complete privacy from urban surroundings.",
    solution:
      "Designed a contemporary villa with strategic window placement, using a neutral color palette and open floor plans to create flow and brightness.",
    highlights: [
      "Open floor plan concept",
      "Floor-to-ceiling windows",
      "Smart home integration",
      "Energy-efficient systems",
    ],
  },
  "residence-02": {
    title: "Classic Estate",
    category: "Residentieel Klassiek",
    location: "Utrecht",
    year: 2023,
    area: "450 m²",
    status: "Completed",
    description: "A refined classical estate that blends traditional architecture with contemporary comfort.",
    challenge: "Preserve architectural heritage while modernizing the interior for contemporary living.",
    solution:
      "Carefully integrated modern amenities within the classic framework, maintaining historical character while improving functionality.",
    highlights: ["Heritage preservation", "Modern amenities", "Elegant proportions", "Period details"],
  },
  "industrial-01": {
    title: "Office Complex",
    category: "Kantoor & Industriebouw",
    location: "Rotterdam",
    year: 2022,
    area: "12,500 m²",
    status: "Completed",
    description: "A state-of-the-art office complex designed for collaborative work environments.",
    challenge: "Design a flexible workspace that fosters collaboration while providing focused work areas.",
    solution:
      "Created diverse zones including open collaboration spaces, private offices, and meeting areas with sustainable design principles.",
    highlights: ["Flexible workspace design", "Sustainable materials", "Natural lighting", "Wellness-focused design"],
  },
  "interior-01": {
    title: "Interior Design",
    category: "Interieur",
    location: "The Hague",
    year: 2022,
    area: "2,500 m²",
    status: "Completed",
    description: "A luxury interior design project that combines aesthetics with functionality.",
    challenge: "Create a cohesive interior that reflects the client's personality and lifestyle.",
    solution: "Developed a bespoke interior design scheme with custom furnishings, lighting, and spatial planning.",
    highlights: ["Custom furnishings", "Lighting design", "Color consultation", "Space optimization"],
  },
}

export const testimonials = [
  {
    name: "Jan de Vries",
    role: "CEO, Tech Solutions",
    quote:
      "Studio Architecten transformed our vision into reality. Their attention to detail and creative problem-solving exceeded our expectations.",
    image: "/professional-portrait.jpg",
  },
  {
    name: "Maria García",
    role: "Homeowner",
    quote:
      "The team was professional, responsive, and created a home that perfectly matches our lifestyle. Highly recommended!",
    image: "/professional-portrait.jpg",
  },
  {
    name: "Robert Schmidt",
    role: "Property Developer",
    quote:
      "Working with Studio Architecten has been a game-changer for our development projects. Their innovative approach delivers results.",
    image: "/professional-portrait.jpg",
  },
]

export const services = [
  {
    title: "Architectural Design",
    description: "Comprehensive architectural services from concept to completion.",
  },
  {
    title: "Interior Design",
    description: "Creative interior solutions that enhance spaces and functionality.",
  },
  {
    title: "Urban Planning",
    description: "Strategic planning for urban development and community projects.",
  },
  {
    title: "Sustainable Design",
    description: "Eco-conscious design practices for environmentally responsible projects.",
  },
  {
    title: "3D Visualization",
    description: "High-quality renderings to help clients visualize projects before construction.",
  },
  {
    title: "Project Management",
    description: "End-to-end project management ensuring smooth execution and timely delivery.",
  },
]
