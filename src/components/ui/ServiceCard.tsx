import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { iconMap } from '../../data/iconMap';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceCard({ title, description, icon, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[icon] ?? Briefcase;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-corporate p-8 flex flex-col gap-5"
      role="article"
    >
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center border border-navy/[0.12] bg-navy/[0.04] group-hover:bg-navy group-hover:border-navy transition-all duration-300">
        <Icon
          size={18}
          strokeWidth={1.5}
          className="text-navy/70 group-hover:text-white transition-colors duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base font-serif font-semibold text-navy mb-2.5 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-corporate leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom — link to services page */}
      <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-navy/20 transition-colors duration-300">
        <Link
          to="/services"
          className="text-xs font-medium text-slate-light group-hover:text-navy/70 transition-colors duration-300 uppercase tracking-wider"
        >
          View service →
        </Link>
      </div>
    </motion.div>
  );
}
