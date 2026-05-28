import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/navigation';


const trustBadges = [
  { label: '25+ Years', sub: 'Est. 1999' },
  { label: 'IATA', sub: 'Accredited' },
  { label: 'TAAI', sub: 'Affiliated' },
  { label: 'Corporate', sub: 'Travel Specialists' },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center bg-navy overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background: subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Right panel — editorial block */}
      <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:block" aria-hidden="true">
        <div className="absolute inset-0 bg-navy-light opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
        {/* Edge gradient to blend with left */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy to-transparent" />
      </div>

      <div className="container-corporate relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-8 h-px bg-white/25" />
              <span className="text-xs font-medium text-white/45 uppercase tracking-[0.2em]">
                New Delhi, India · Since 1999
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-serif font-semibold text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)' }}
            >
              Trusted Travel
              <br />
              <span className="text-white/80">Management</span>
              <br />
              Since 1999
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base lg:text-lg text-white/55 leading-relaxed mb-10 max-w-xl"
            >
              MKM Air Travels Pvt. Ltd. is an IATA accredited and TAAI affiliated travel management company based in New Delhi.
              <br />
              We are serving corporates, SMEs, institutions, groups, and individual travellers with reliable end-to-end travel solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a
                href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                className="btn-white"
                aria-label={`Call MKM at ${contactInfo.phones[0]}`}
              >
                <Phone size={15} strokeWidth={2} />
                Call Us
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
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              role="list"
              aria-label="Trust credentials"
            >
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.42 + i * 0.08 }}
                  className="border border-white/12 bg-white/5 px-4 py-3"
                  role="listitem"
                >
                  <p className="text-sm font-semibold text-white leading-tight">{badge.label}</p>
                  <p className="text-xs text-white/45 mt-0.5">{badge.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — credential list (mobile fallback) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:flex flex-col gap-4 pl-8"
            aria-hidden="true"
          >
            {[
              '25+ years of operational experience',
              'IATA accredited travel company',
              'TAAI affiliated member',
              'Corporate & MICE travel specialists',
              'GST registered private limited company',
              'Based in New Delhi - serving PAN India',
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.07 }}
                className="flex items-start gap-3"
              >
                <span className="w-4 h-4 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                </span>
                <span className="text-sm text-white/55 leading-snug">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
