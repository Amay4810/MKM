import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import { services } from '../../data/services';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ServicesPreview() {
  const { ref, isInView, staggerContainer } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = services.length;

  const goTo = useCallback((idx: number) => {
    setActiveIndex((idx + total) % total);
  }, [total]);

  // Auto-advance every 3s
  useEffect(() => {
    autoplayRef.current = setInterval(() => goTo(activeIndex + 1), 3000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [activeIndex, goTo]);

  return (
    <section className="section-pad bg-section-alt" aria-labelledby="services-preview-heading">
      <div className="container-corporate">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="What We Offer"
            title="End-to-End Travel Services"
            subtitle="Comprehensive travel support for corporates, groups, institutions, and individual travellers."
          />
          <div className="flex-shrink-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors duration-200 whitespace-nowrap"
            >
              All Services
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* ── MOBILE: Auto-slideshow ── */}
        <div className="sm:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white"
            >
              <ServiceCard
                title={services[activeIndex].title}
                description={services[activeIndex].description}
                icon={services[activeIndex].icon}
                index={0}
              />
            </motion.div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous service"
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-navy/60 hover:border-navy hover:text-navy transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-4 h-1.5 bg-navy'
                      : 'w-1.5 h-1.5 bg-gray-300 hover:bg-navy/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next service"
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-navy/60 hover:border-navy hover:text-navy transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Slide counter */}
          <p className="text-center text-xs text-slate-light mt-2">
            {activeIndex + 1} / {total}
          </p>
        </div>

        {/* ── DESKTOP (sm+): Original staggered grid ── */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200"
        >
          {services.map((service, i) => (
            <div key={service.id} className="bg-white">
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={i}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
