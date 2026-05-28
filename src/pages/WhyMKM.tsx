import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/ui/CTASection';
import { whyReasons, stats } from '../data/whyMKM';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function WhyMKM() {
  const { ref, isInView, staggerContainer, fadeUpVariants } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>Why Choose MKM Air Travels | Experience & Reliability</title>
        <meta
          name="description"
          content="Experience, responsiveness, and travel management built around client trust. 25+ years of IATA accredited travel expertise in New Delhi."
        />
        <link rel="canonical" href="https://mkmairtravels.com/why-mkm" />
      </Helmet>

      <PageHero
        eyebrow="Why MKM"
        heading="Why MKM Air Travels"
        subheading="Experience, responsiveness, and travel management built around client trust."
        breadcrumbs={[{ label: 'Why MKM' }]}
      />

      {/* Intro statement */}
      <section className="section-pad-sm bg-white border-b border-gray-100">
        <div className="container-corporate">
          <div className="max-w-3xl">
            <p className="text-lg text-slate-corporate leading-relaxed font-light">
              MKM Air Travels has been operational for over 25 years. That continuity is not accidental — it reflects consistent service delivery, client satisfaction, and a focus on long-term relationships over short-term volume. Our growth has come from trust, not advertising.
            </p>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="section-pad-sm bg-section-alt border-b border-gray-100">
        <div className="container-corporate">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-8 text-center">
                <p className="text-4xl font-serif font-semibold text-navy mb-2">{stat.value}</p>
                <p className="text-xs font-medium text-charcoal uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-xs text-slate-light">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Reasons */}
      <section className="section-pad bg-white">
        <div className="container-corporate">
          <SectionHeading
            eyebrow="6 Reasons to Work with MKM"
            title="What Makes MKM a Dependable Travel Partner"
            className="mb-14"
          />
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-0"
          >
            {whyReasons.map((reason) => (
              <motion.div
                key={reason.id}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-12 gap-8 py-10 border-b border-gray-100 last:border-b-0 items-start"
              >
                <div className="lg:col-span-2">
                  <span className="text-5xl font-serif font-light text-navy/10 leading-none">{reason.number}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-lg font-serif font-semibold text-navy leading-snug">{reason.title}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-body">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust architecture panel */}
      <section className="section-pad bg-section-alt">
        <div className="container-corporate">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Industry Standing"
                title="Recognised Within the Professional Travel Ecosystem"
                className="mb-6"
              />
              <p className="text-body mb-8">
                IATA accreditation and TAAI affiliation are not just credentials — they reflect MKM's commitment to operating within established industry frameworks and maintaining professional standards across all travel categories.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-px bg-gray-200">
                {[
                  {
                    label: 'IATA Accreditation',
                    full: 'International Air Transport Association',
                    desc: 'Recognised globally for professional standards in air travel agency operations.',
                  },
                  {
                    label: 'TAAI Affiliation',
                    full: 'Travel Agents Association of India',
                    desc: 'Member of India\'s primary professional body for travel agents and tour operators.',
                  },
                  {
                    label: 'GST Registration',
                    full: 'GSTIN: 07AADCM0123G1Z1',
                    desc: 'Fully compliant GST registered private limited company — transparent billing for all clients.',
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-white p-7">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-navy mb-0.5">{item.label}</p>
                        <p className="text-xs font-mono text-slate-light mb-3">{item.full}</p>
                        <p className="text-sm text-slate-corporate">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Choose a travel partner built for reliability."
        subtext="Contact MKM Air Travels for corporate travel, group movements, MICE, or individual travel requirements."
      />
    </>
  );
}
