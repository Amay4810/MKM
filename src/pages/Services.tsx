import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/ui/CTASection';
import { iconMap } from '../data/iconMap';
import { services } from '../data/services';


export default function Services() {
  return (
    <>
      <Helmet>
        <title>Travel Services | Flights, Hotels, Visas, MICE and Group Travel | MKM</title>
        <meta
          name="description"
          content="Explore MKM's end to end travel services including corporate travel, group travel, MICE movements, hotels, visas, transfers, leisure holidays, forex coordination, and travel insurance support."
        />
        <link rel="canonical" href="https://mkmairtravels.com/services" />
      </Helmet>

      <PageHero
        eyebrow="Our Services"
        heading="End-to-End Travel Services"
        subheading="Comprehensive travel support for corporates, groups, institutions, and individual travellers."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section-pad bg-white">
        <div className="container-corporate">
          <div className="space-y-0">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Briefcase;
              const isEven = i % 2 === 0;

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55 }}
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-16 py-16 border-b border-gray-100 last:border-b-0 items-center`}
                  aria-labelledby={`service-${service.id}-heading`}
                >
                  {/* Number + content */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-start gap-6">
                      <span className="text-xs font-mono text-slate-light/60 tracking-wider mt-1 w-6 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h2
                          id={`service-${service.id}-heading`}
                          className="text-xl font-serif font-semibold text-navy mb-4 leading-snug"
                        >
                          {service.title}
                        </h2>
                        <p className="text-body leading-relaxed mb-4">{service.description}</p>
                        {service.fullDescription && (
                          <p className="text-sm text-slate-light leading-relaxed">{service.fullDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Icon panel */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className={`p-10 flex flex-col gap-4 ${isEven ? 'bg-section-alt' : 'bg-navy'}`}>
                      <div className={`w-12 h-12 flex items-center justify-center border ${isEven ? 'border-navy/[0.12] bg-white' : 'border-white/15 bg-white/[0.08]'}`}>
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className={isEven ? 'text-navy/60' : 'text-white/60'}
                        />
                      </div>
                      <h3 className={`text-lg font-serif font-semibold ${isEven ? 'text-navy' : 'text-white'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isEven ? 'text-slate-corporate' : 'text-white/55'}`}>
                        Talk to MKM for{' '}
                        <span className="font-medium">{service.title.toLowerCase()}</span>{' '}
                        requirements — corporate, group, or individual.
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a travel requirement?"
        subtext="Contact MKM Air Travels for any of the above services — corporate, group, MICE, leisure, or individual travel."
      />
    </>
  );
}
