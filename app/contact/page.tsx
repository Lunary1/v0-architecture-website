import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import ContactMap from "@/components/contact-map";

export const metadata = {
  title: "Contact | Architectenbureau Paul Kindt",
  description:
    "Neem contact op met Architectenbureau Paul Kindt voor uw architectuurproject.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-border">
        <ContactInfo />
        <ContactForm />
      </div>
      <ContactMap />
      <Footer />
    </main>
  );
}
