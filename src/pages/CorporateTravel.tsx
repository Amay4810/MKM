import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/ui/CTASection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const capabilities = [
  {
    title: 'Flight Bookings',
    description:
      'Domestic and international air ticketing, route options, urgent bookings, changes, cancellations, and reissuance assistance.',
    points: ['Domestic & international routes', 'Urgent and last-minute bookings', 'Changes, cancellations & reissuance'],
  },
  {
    title: 'Hotel Coordination',
    description:
      'Corporate stays, business hotels, delegate accommodation, and group room coordination.',
    points: ['Corporate hotel bookings', 'Delegate and group accommodation', 'Budget and mid-range coordination'],
  },
  {
    title: 'Visa & Documentation Support',
    description:
      'Guidance for visa documentation, travel checklists, and process coordination.',
    points: ['Documentation guidance', 'Travel readiness checklists', 'Process coordination support'],
  },
  {
    title: 'Car Rentals & Transfers',
    description:
      'Airport transfers, chauffeur services, local movements, outstation travel, and intercity transport support.',
    points: ['Airport pickup and drop', 'Chauffeur-driven vehicles', 'Outstation & intercity transport'],
  },
  {
    title: 'MICE & Group Travel Handling',
    description:
      'Meetings, incentive movements, conferences, exhibitions, business delegations, corporate offsites, and other group travel requirements.',
    points: ['Meeting and conference logistics', 'Incentive & offsite coordination', 'Group flights and hotel blocks'],
  },
  {
    title: 'Billing & Reporting Support',
    description:
      'GST compliant invoicing, transparent documentation, MIS reporting support where required, and account-based servicing.',
    points: ['GST compliant invoices', 'MIS reporting where required', 'Transparent documentation'],
  },
];

export default function CorporateTravel() {
  const { ref, isInView, staggerContainer, fadeUpVariants } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>Corporate Travel Management Services | MKM Air Travels</title>
        <meta
          name="description"
          content="MKM supports businesses with air ticketing, hotels, visas, transfers, group movements, MICE travel, billing support, and dedicated corporate travel servicing."
        />
        <link rel="canonical" href="https://mkmairtravels.com/corporate-travel" />
      </Helmet>

      <PageHero
        eyebrow="Corporate Travel"
        heading="Corporate Travel Management for Growing and Established Businesses"
        subheading="Reliable business travel support backed by speed, accountability, and more than 25 years of experience."
        breadcrumbs={[{ label: 'Corporate Travel' }]}
      />

      {/* Intro */}
      <section className="section-pad bg-white">
        <div className="container-corporate">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Who We Work With"
                title="Structured Support for Business Travel"
                className="mb-8"
              />
              <div className="space-y-4 text-body">
                <p>
                  MKM helps organisations manage business travel with a practical and responsive service model. We support routine corporate movements as well as urgent, complex, and multi-city travel requirements.
                </p>
                <p>
                  Whether the need is for senior management travel, employee movements, visiting delegates, project teams, corporate offsites, MICE travel, or group bookings, our team helps simplify the process and improve coordination.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="bg-section-alt border border-gray-100 p-8"
              >
                <p className="text-caption text-slate-light mb-5">Who We Serve</p>
                <ul className="space-y-3">
                  {['Corporates & MNCs', 'SMEs & Promoter-led Businesses', 'Institutions & PSUs', 'Professional Service Firms', 'Corporate Groups & Delegations', 'Individual Business Travellers'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-corporate">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad bg-section-alt">
        <div className="container-corporate">
          <SectionHeading
            eyebrow="Corporate Travel Capabilities"
            title="What MKM Manages for Your Business"
            className="mb-12"
          />
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
          >
            {capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                className="bg-white p-8"
              >
                <h3 className="text-base font-serif font-semibold text-navy mb-3">{cap.title}</h3>
                <p className="text-sm text-slate-corporate leading-relaxed mb-5">{cap.description}</p>
                <ul className="space-y-2">
                  {cap.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-slate-light">
                      <Check size={11} strokeWidth={2.5} className="text-navy/40 flex-shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credit facility */}
      <section className="section-pad-sm bg-white border-t border-gray-100">
        <div className="container-corporate">
          <div className="grid lg:grid-cols-2 gap-px bg-gray-100">
            <div className="bg-white py-10 px-8 lg:px-10">
              <p className="text-caption text-slate-light mb-3">Credit Facility</p>
              <h3 className="text-lg font-serif font-semibold text-navy mb-3">Credit for Eligible Corporate Accounts</h3>
              <p className="text-sm text-slate-corporate leading-relaxed">
                Credit facility may be considered based on account evaluation and mutually agreed commercial terms. Speak with the MKM team to discuss eligibility and terms.
              </p>
            </div>
            <div className="bg-white py-10 px-8 lg:px-10">
              <p className="text-caption text-slate-light mb-3">GST Billing</p>
              <h3 className="text-lg font-serif font-semibold text-navy mb-3">GST Compliant Invoicing</h3>
              <p className="text-sm text-slate-corporate leading-relaxed">
                As a GST registered private limited company, MKM provides compliant invoices for all services. GSTIN: <span className="font-mono text-navy">07AADCM0123G1Z1</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Need support for corporate travel or group movements?"
        subtext="Contact the MKM team directly for flight bookings, hotel coordination, visa assistance, MICE travel, or any other business travel requirement."
      />
    </>
  );
}
