import { useId } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/navigation';

interface CTASectionProps {
  heading: string;
  subtext?: string;
  showEmail?: boolean;
}

export default function CTASection({
  heading,
  subtext,
  showEmail = false,
}: CTASectionProps) {
  const id = useId();
  const headingId = `cta-heading-${id}`;

  return (
    <section className="bg-navy py-10 lg:py-14 no-print" aria-labelledby={headingId}>
      <div className="container-corporate">
        <div className="max-w-3xl">
          {/* Minimal gold accent — only a thin rule */}
          <span className="inline-block w-8 h-px bg-gold/50 mb-5" aria-hidden="true" />

          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="text-display-md font-serif font-semibold text-white mb-5 leading-tight"
          >
            {heading}
          </motion.h2>

          {subtext && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-sm text-white/60 mb-6 leading-relaxed max-w-xl"
            >
              {subtext}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
              className="btn-white"
              aria-label={`Call MKM at ${contactInfo.phones[0]}`}
            >
              <Phone size={15} strokeWidth={2} />
              Call Now
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
              aria-label="Contact MKM on WhatsApp"
            >
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp Us
            </a>
            {showEmail && (
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-outline-white"
                aria-label={`Email MKM at ${contactInfo.email}`}
              >
                Email Us
              </a>
            )}
          </motion.div>

          {/* Contact numbers below — low-key */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-5 flex flex-wrap gap-x-6 gap-y-1"
          >
            {contactInfo.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-sm text-white/35 hover:text-white/60 transition-colors duration-200 font-mono"
              >
                {phone}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
