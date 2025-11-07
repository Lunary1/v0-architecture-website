import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-light tracking-widest mb-6">STUDIO ARCH</h4>
            <p className="font-light text-gray-300 text-sm leading-relaxed">
              Modern architecture studio specializing in residential, industrial, and interior design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-light tracking-widest text-gray-400 mb-6">PAGINA'S</h4>
            <div className="space-y-3">
              <Link href="/" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Home
              </Link>
              <Link href="/projecten" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Projecten
              </Link>
              <Link href="/over" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Over Ons
              </Link>
              <Link href="/nieuws" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Nieuws
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-light tracking-widest text-gray-400 mb-6">CONTACT</h4>
            <div className="space-y-3 text-sm">
              <p className="font-light text-gray-300">
                <a href="tel:+31204551234" className="hover:text-white transition">
                  +31 (0)20 455 1234
                </a>
              </p>
              <p className="font-light text-gray-300">
                <a href="mailto:info@studioarch.nl" className="hover:text-white transition">
                  info@studioarch.nl
                </a>
              </p>
              <p className="font-light text-gray-300">
                Prinsengracht 123
                <br />
                1015 EK Amsterdam
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-light tracking-widest text-gray-400 mb-6">VOLGEN</h4>
            <div className="space-y-3">
              <a href="#" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Instagram
              </a>
              <a href="#" className="block font-light text-gray-300 hover:text-white transition text-sm">
                LinkedIn
              </a>
              <a href="#" className="block font-light text-gray-300 hover:text-white transition text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light text-gray-400">
            <p>&copy; {currentYear} Studio Architecten. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
