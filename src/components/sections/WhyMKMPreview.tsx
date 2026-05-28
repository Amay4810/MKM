import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { whyReasons } from '../../data/whyMKM';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function WhyMKMPreview() {
  const { ref, isInView, staggerContainer } = useScrollAnimation();

  return (
    <section className="section-pad bg-section-alt" aria-labelledby="why-mkm-preview-heading">
      <div className="container-corporate">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Why Choose MKM"
            title="Experience, Credibility, and Accountability"
            subtitle="A travel company built on trust, not transactions."
          />
          <Link
            to="/why-mkm"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            View All Reasons
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
        >
          {whyReasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white p-8 group hover:bg-navy transition-colors duration-300"
            >
              <span className="text-xs font-mono text-slate-light group-hover:text-white/30 transition-colors duration-300 mb-5 block tracking-wider">
                {reason.number}
              </span>
              <h3 className="text-base font-serif font-semibold text-navy group-hover:text-white transition-colors duration-300 mb-3 leading-snug">
                {reason.title}
              </h3>
              <p className="text-sm text-slate-corporate group-hover:text-white/65 transition-colors duration-300 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
