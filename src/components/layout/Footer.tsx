import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { navItems, contactInfo } from '../../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/70" role="contentinfo">
      <div className="container-corporate py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block group" aria-label="MKM Air Travels — Home">
              <span className="text-base font-serif font-semibold text-white group-hover:text-ivory transition-colors duration-200">
                MKM Air Travels Pvt. Ltd.
              </span>
            </Link>
            <p className="text-xs text-white/45 mt-2 leading-relaxed">
              IATA Accredited · TAAI Affiliated · Est. 1999<br />
              New Delhi, India
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs font-medium text-white/35 uppercase tracking-widest mb-3">Pages</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium text-white/35 uppercase tracking-widest mb-3">Contact</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Phone size={13} className="text-white/35 flex-shrink-0" />
                {contactInfo.phones[0]}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <MessageCircle size={13} className="text-white/35 flex-shrink-0" />
                WhatsApp Us
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Mail size={13} className="text-white/35 flex-shrink-0" />
                {contactInfo.email}
              </a>
              <a
                href="https://maps.app.goo.gl/kqAcgdRkQcyqpLQ8A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <MapPin size={13} className="text-white/35 flex-shrink-0 mt-0.5" />
                Mahatta Tower, Janakpuri, New Delhi
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-corporate py-2.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
            <p className="text-xs text-white/30">
              © {year} MKM Air Travels Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs text-white/25">
              GSTIN: {contactInfo.gstin}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
