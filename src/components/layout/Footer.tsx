import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { navItems, contactInfo } from '../../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/70" role="contentinfo">
      {/* Subtle gradient accent at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="container-corporate py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block group w-fit" aria-label="MKM Air Travels — Home">
              <span className="text-lg font-serif font-semibold text-white group-hover:text-ivory transition-colors duration-200 leading-snug">
                MKM Air Travels<br />
                <span className="text-sm font-sans font-normal text-white/50">Pvt. Ltd.</span>
              </span>
            </Link>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-white/40 tracking-wide">IATA Accredited · TAAI Affiliated</span>
              <span className="text-xs text-white/40 tracking-wide">Established 1999 · New Delhi, India</span>
            </div>
            <p className="text-xs text-white/25 mt-1">GSTIN: {contactInfo.gstin}</p>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">Quick Links</p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center gap-3 text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                <Phone size={14} className="text-white/30 flex-shrink-0" />
                {contactInfo.phones[0]}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                <MessageCircle size={14} className="text-white/30 flex-shrink-0" />
                WhatsApp Us
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-3 text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                <Mail size={14} className="text-white/30 flex-shrink-0" />
                {contactInfo.email}
              </a>
              <a
                href="https://maps.app.goo.gl/kqAcgdRkQcyqpLQ8A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-3 text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                <MapPin size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
                <span>Mahatta Tower, Janakpuri,<br />New Delhi — 110058</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-corporate py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/30">
              © {year} MKM Air Travels Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              Crafted with care for corporate travel excellence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
