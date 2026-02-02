import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import type { Metadata } from "next";

const SITE_URL = "https://www.architect-kindt.be";

export const metadata: Metadata = {
  title: "Privacybeleid | Architectenbureau Paul Kindt",
  description:
    "Lees ons privacybeleid voor informatie over gegevensbescherming bij Architectenbureau Paul Kindt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/privacybeleid`,
  },
};

export default function PrivacyBeleidPage() {
  return (
    <main className="bg-white text-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-36 md:pt-52 pb-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8 md:mb-12 text-center md:text-left">
            Privacybeleid
          </h1>

          <div className="mb-12 md:mb-16 flex md:block justify-center">
            <div className="w-12 h-px bg-primary/30"></div>
          </div>

          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-center md:text-left">
            Architectenbureau Paul Kindt gaat zorgvuldig om met uw persoonlijke
            gegevens. Dit privacybeleid beschrijft hoe wij uw informatie
            verzamelen, gebruiken en beveiligen.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                1. Verantwoordelijke voor Gegevensverwerking
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Architectenbureau Paul Kindt is verantwoordelijk voor de
                verwerking van uw persoonlijke gegevens. Alle vragen met
                betrekking tot uw privacy kunnen naar ons worden gericht via
                info@architect-kindt.be of het adres vermeld op onze
                contactpagina.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                2. Welke Gegevens Verzamelen Wij
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Wij verzamelen persoonlijke gegevens die u vrijwillig met ons
                deelt via contactformulieren, offerteverzoeken en
                e-mailcommunicatie. Dit kan uw naam, e-mailadres,
                telefoonnummer, bedrijfsinformatie en projectgegevens bevatten.
                Ook verzamelen wij automatisch bepaalde technische informatie
                wanneer u onze website bezoekt, zoals uw IP-adres, browsertype
                en pagina's die u bekijkt.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                3. Hoe Gebruiken Wij Uw Gegevens
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Uw gegevens worden uitsluitend gebruikt voor:
              </p>
              <ul className="text-base font-light text-foreground leading-relaxed list-disc list-inside space-y-2">
                <li>Het verwerken van uw contactverzoeken en offertes</li>
                <li>Het onderhouden van communicatie over lopende projecten</li>
                <li>Het verbeteren van onze website en diensten</li>
                <li>Het nakomen van wettelijke verplichtingen</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                4. Cookies en Tracking
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Onze website maakt gebruik van cookies voor sessiemanagement en
                analytics om uw ervaring te verbeteren. Essentiële cookies zijn
                nodig voor de werking van de website. U kunt cookies beheren via
                uw browserinstellingen. Sommige cookies kunnen worden geweigerd
                zonder dat dit de basisfunctionaliteit van onze site beïnvloedt.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                5. Gegevensbescherming
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Wij implementeren passende technische en organisatorische
                maatregelen om uw persoonlijke gegevens te beschermen tegen
                ongeautoriseerde toegang, wijziging, verspreiding of
                vernietiging. Uw gegevens worden beveiligd via SSL-encryptie en
                veilige serverconfiguraties.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                6. Uw Rechten
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                U heeft het recht om uw persoonlijke gegevens in te zien, aan te
                passen of te verwijderen. U kunt ook bezwaar maken tegen de
                verwerking van uw gegevens. Voor het uitoefenen van deze rechten
                kunt u contact met ons opnemen op info@architect-kindt.be. Wij
                zullen uw verzoek binnen 30 dagen afhandelen.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                7. Bewaartermijnen
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Uw persoonlijke gegevens worden niet langer bewaard dan nodig
                voor het doel waarvoor ze zijn verzameld. Voor projectgegevens
                hanteren wij een bewaartermijn van zes jaar na projectafronding,
                conform wettelijke verplichting. Contactgegevens worden
                verwijderd na twee jaar inactiviteit, tenzij wettelijk anders
                vereist.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                8. Wijzigingen aan dit Beleid
              </h2>
              <p className="text-base font-light text-foreground leading-relaxed">
                Wij behouden ons het recht voor dit privacybeleid periodiek aan
                te passen. Wijzigingen worden op deze pagina gepubliceerd met
                een bijgewerkte versiedatum. Verdere vragen over onze
                gegevensbescherming beantwoorden wij graag via
                info@architect-kindt.be.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
