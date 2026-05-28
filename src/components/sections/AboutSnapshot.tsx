import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function AboutSnapshot() {
  const { ref, isInView, fadeUpVariants } = useScrollAnimation();

  return (
    <section className="section-pad bg-white" aria-labelledby="about-snapshot-heading">
      <div className="container-corporate">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — heading and content */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="About MKM Air Travels"
              title="A Travel Partner Built on Trust and Responsiveness"
              className="mb-8"
            />

            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUpVariants}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="space-y-4"
            >
              <p className="text-body">
                For over 25 years, MKM Air Travels has helped clients manage their travel requirements with speed, accuracy, and personal attention. From routine business travel to urgent ticketing, complex itineraries, visas, hotels, ground transport, corporate MICE movements, and group handling, we provide dependable travel support under one roof.
              </p>
              <p className="text-body">
                Our focus is simple: clear communication, reliable execution, and long-term client relationships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Link to="/about" className="btn-primary">
                About MKM
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </motion.div>
          </div>

          {/* Right — credentials grid */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-px bg-gray-100"
            >
              {[
                { label: 'Established', value: '1999', sub: 'New Delhi, India' },
                { label: 'Accreditation', value: 'IATA', sub: 'International Air Transport Association' },
                { label: 'Affiliation', value: 'TAAI', sub: 'Travel Agents Association of India' },
                { label: 'Registration', value: 'GST', sub: 'Registered Private Limited Company' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-7">
                  <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-2">{item.label}</p>
                  <p className="text-2xl font-serif font-semibold text-navy mb-1">{item.value}</p>
                  <p className="text-xs text-slate-light leading-snug">{item.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* Principles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-px grid grid-cols-1 gap-px bg-gray-100"
            >
              <div className="bg-navy px-7 py-5">
                <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-3">Core Principles</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {['Reliability', 'Responsiveness', 'Transparency', 'Personal Attention', 'Long-term Trust'].map((p) => (
                    <span key={p} className="text-sm text-white/65">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
