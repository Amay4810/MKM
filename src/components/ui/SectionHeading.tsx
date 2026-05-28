import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const { ref, isInView, fadeUpVariants } = useScrollAnimation();

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUpVariants}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      {eyebrow && (
        <p className={`text-caption mb-3 ${light ? 'text-white/45' : 'text-slate-light'}`}>
          {eyebrow}
        </p>
      )}
      {/* Gold rule — used very minimally, only on dark sections */}
      {light && <span className="w-10 h-px bg-gold/60 mb-5" aria-hidden="true" />}
      <h2
        className={`text-display-md font-serif font-semibold ${
          light ? 'text-white' : 'text-navy'
        } max-w-2xl leading-tight`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed max-w-2xl ${
            light ? 'text-white/65' : 'text-slate-corporate'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
