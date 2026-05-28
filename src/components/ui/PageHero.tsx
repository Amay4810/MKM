import { motion } from 'framer-motion';
import Breadcrumb from '../ui/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  breadcrumbs?: BreadcrumbItem[];
  size?: 'default' | 'sm';
}

export default function PageHero({
  eyebrow,
  heading,
  subheading,
  breadcrumbs,
  size = 'default',
}: PageHeroProps) {
  const padClass = size === 'sm' ? 'py-16 lg:py-20' : 'py-20 lg:py-28';

  return (
    <section className={`bg-navy relative overflow-hidden ${padClass}`} aria-labelledby="page-hero-heading">
      {/* Subtle background texture — horizontal lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,1) 39px, rgba(255,255,255,1) 40px)',
        }}
        aria-hidden="true"
      />
      {/* Right-side geometric accent */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 19px, rgba(255,255,255,1) 19px, rgba(255,255,255,1) 20px)',
        }}
        aria-hidden="true"
      />

      <div className="container-corporate relative">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} light />}

        <div className="max-w-3xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-caption text-white/40 mb-4"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            id="page-hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-display-lg font-serif font-semibold text-white leading-tight mb-5"
          >
            {heading}
          </motion.h1>
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-base text-white/60 leading-relaxed max-w-2xl"
            >
              {subheading}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
