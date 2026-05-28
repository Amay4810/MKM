import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const highlights = [
  'Dedicated travel support',
  'GST compliant billing',
  'MIS reporting support, where required',
  'Credit facility consideration, subject to evaluation',
  'Assistance for urgent and last-minute travel',
  'Support for individual, group, and corporate MICE movements',
];

export default function CorporateHighlight() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="section-pad bg-white" aria-labelledby="corporate-highlight-heading">
      <div className="container-corporate">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — content */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Corporate Travel"
              title="Business Travel Support That Stays Accountable"
              className="mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-body mb-8"
            >
              MKM works with organisations that value personal servicing, quick turnaround, and dependable execution. We support businesses with flight bookings, hotels, documentation coordination, transfers, group movements, and travel-related reporting requirements.
            </motion.p>

            {/* Highlights list */}
            <motion.ul
              ref={ref}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="space-y-3 mb-10"
              role="list"
            >
              {highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-5 h-5 border border-navy/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} strokeWidth={2.5} className="text-navy/60" />
                  </span>
                  <span className="text-sm text-slate-corporate leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <Link to="/corporate-travel" className="btn-primary">
              Corporate Travel Services
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>

          {/* Right — structured panel */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative"
            >
              {/* Main panel */}
              <div className="bg-navy p-10 lg:p-12">
                <p className="text-xs text-white/40 uppercase tracking-[0.18em] font-medium mb-6">Corporate Capabilities</p>
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {[
                    { label: 'Flight Bookings', sub: 'Domestic & International' },
                    { label: 'Hotel Coordination', sub: 'Corporate & Group' },
                    { label: 'Visa Support', sub: 'Documentation Guidance' },
                    { label: 'Transfers', sub: 'Airport & Intercity' },
                    { label: 'MICE Handling', sub: 'Meetings, Conferences' },
                    { label: 'Billing & MIS', sub: 'GST Compliant' },
                  ].map((item) => (
                    <div key={item.label} className="bg-navy-light px-5 py-5">
                      <p className="text-sm font-medium text-white mb-1">{item.label}</p>
                      <p className="text-xs text-white/45">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accent block below */}
              <div className="bg-ivory border border-gray-100 px-8 py-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-0.5">Credit Facility</p>
                  <p className="text-sm text-slate-corporate">Available subject to account evaluation</p>
                </div>
                <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-0.5">Invoicing</p>
                  <p className="text-sm text-slate-corporate">GST Registered · PAN India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
