import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactHero from "@/components/contact-hero"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"

export const metadata = {
  title: "Contact | Studio Architecten",
  description: "Neem contact op met Studio Architecten voor uw architectuurproject.",
}

export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <ContactInfo />
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
