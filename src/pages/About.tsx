import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/ui/CTASection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const timeline = [
  { year: '1999', event: 'MKM Air Travels established in New Delhi' },
  { year: '2000s', event: 'Built foundations in corporate ticketing and group travel handling' },
  { year: '2010s', event: 'Expanded services to include MICE, visa assistance, and ground transport' },
  { year: '2020s', event: 'Continued growth through long-term client relationships and referral trust' },
  { year: 'Today', event: '25+ years of operational continuity — IATA accredited, TAAI affiliated' },
];

const principles = [
  { title: 'Reliability', desc: 'Consistent, dependable service across every client engagement and travel category.' },
  { title: 'Responsiveness', desc: 'Quick turnaround on requests, changes, and urgent requirements — including last-minute bookings.' },
  { title: 'Transparency', desc: 'Clear communication, honest documentation, and straightforward billing with no hidden charges.' },
  { title: 'Personal Attention', desc: 'Every client is handled directly by an experienced team — not passed through automated workflows or call centres.' },
  { title: 'Long-term Trust', desc: 'We have grown through repeat clients and word-of-mouth relationships, not advertising. Our track record speaks for itself.' },
  { title: 'Industry Credentials', desc: 'IATA accredited and TAAI affiliated — operating within established professional frameworks for over 25 years.' },
];

export default function About() {
  const { ref, isInView, staggerContainer, fadeUpVariants } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>About MKM Air Travels | Trusted Travel Management Since 1999</title>
        <meta
          name="description"
          content="Learn about MKM Air Travels Pvt. Ltd., a New Delhi based travel company serving corporates, SMEs, institutions, groups, and individual travellers since 1999."
        />
        <meta property="og:title" content="About MKM Air Travels | Trusted Travel Management Since 1999" />
        <link rel="canonical" href="https://mkmairtravels.com/about" />
      </Helmet>

      <PageHero
        eyebrow="About Us"
        heading="About MKM Air Travels"
        subheading="A New Delhi based travel management company serving clients with reliability, transparency, and experience since 1999."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Main Company Copy */}
      <section className="section-pad bg-white">
        <div className="container-corporate">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our Story"
                title="Built on Trust, Sustained by Results"
                className="mb-8"
              />
              <div className="space-y-5 text-body">
                <p>
                  MKM Air Travels Pvt. Ltd. was established in 1999 and has built a strong reputation as a trusted travel partner for corporates, SMEs, institutions, groups, and individual travellers.
                </p>
                <p>
                  With over 25 years of experience in the travel industry, MKM provides end-to-end travel solutions across corporate ticketing, hotel bookings, visa assistance, ground transport, leisure travel, corporate MICE requirements, and group travel coordination.
                </p>
                <p>
                  As an IATA accredited and TAAI affiliated travel company, MKM combines industry experience with personalised service. We believe good travel management is not only about issuing tickets. It is about responding quickly, planning carefully, solving problems when plans change, and delivering a smooth experience every time.
                </p>
              </div>
            </div>

            {/* Sidebar credentials */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="bg-navy p-8"
              >
                <p className="text-xs text-white/40 uppercase tracking-[0.18em] font-medium mb-6">Credentials</p>
                <ul className="space-y-4">
                  {[
                    'Established in 1999',
                    'IATA Accredited',
                    'TAAI Affiliated',
                    'GST Registered Private Limited Company',
                    'Based in New Delhi, India',
                  ].map((cred) => (
                    <li key={cred} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0 mt-2" />
                      <span className="text-sm text-white/65">{cred}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-white/35 uppercase tracking-wider mb-1">GSTIN</p>
                  <p className="text-sm font-mono text-white/55">07AADCM0123G1Z1</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-section-alt">
        <div className="container-corporate">
          <SectionHeading
            eyebrow="Our Approach"
            title="Service That Prioritises Long-Term Relationships"
            subtitle="MKM has grown through trust, repeat business, and word-of-mouth relationships. Our team works closely with clients to understand their travel requirements and provide practical, dependable support across every stage of the journey."
            className="mb-14"
          />

          {/* Core Principles */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
          >
            {principles.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                className="bg-white p-8"
              >
                <h3 className="text-base font-serif font-semibold text-navy mb-3">{p.title}</h3>
                <p className="text-sm text-slate-corporate leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-white">
        <div className="container-corporate">
          <SectionHeading
            eyebrow="25 Years of Service"
            title="Our Journey in Travel Management"
            className="mb-14"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-14 top-0 bottom-0 w-px bg-gray-100 hidden sm:block" aria-hidden="true" />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-8 sm:gap-12 py-6 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-shrink-0 w-20 sm:w-28">
                    <span className="text-xs font-mono font-medium text-navy/60 uppercase tracking-wider">{item.year}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-navy/20 flex-shrink-0 mt-1.5 hidden sm:block" />
                    <p className="text-sm text-slate-corporate leading-relaxed">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Choose a travel partner built for reliability."
        subtext="Speak with the MKM team for corporate travel, group movements, MICE, or individual travel requirements."
      />
    </>
  );
}
