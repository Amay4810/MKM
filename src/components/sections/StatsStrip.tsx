import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { stats } from '../../data/whyMKM';


function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const isSpecial = stat.value === '24/7';
  const { count, ref } = useCounterAnimation({
    end: stat.numericValue,
    duration: 1800,
    delay: index * 150,
  });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col py-8 px-6 border-r border-gray-100 last:border-r-0"
    >
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="text-4xl lg:text-5xl font-serif font-semibold text-navy leading-none mb-2"
        aria-label={stat.value}
      >
        {isSpecial ? '24/7' : `${count.toLocaleString('en-IN')}${stat.suffix}`}
      </span>
      <span className="text-sm font-medium text-charcoal mb-1">{stat.label}</span>
      <span className="text-xs text-slate-light">{stat.description}</span>
    </motion.div>
  );
}

export default function StatsStrip() {
  const { ref, isInView, staggerContainer } = useScrollAnimation();

  return (
    <section className="bg-white border-y border-gray-100" aria-label="Company statistics">
      <div className="container-corporate">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-gray-100 lg:divide-y-0"
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
