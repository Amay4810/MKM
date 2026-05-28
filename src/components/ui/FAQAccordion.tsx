import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '../../types';

interface FAQAccordionProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordion({ item, isOpen, onToggle }: FAQAccordionProps) {
  return (
    <div
      className={`border-b border-gray-100 transition-colors duration-200 ${
        isOpen ? 'bg-white' : 'bg-transparent hover:bg-gray-50/50'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-5 px-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset"
        aria-expanded={isOpen}
        id={`faq-btn-${item.id}`}
        aria-controls={`faq-panel-${item.id}`}
      >
        <span className={`text-base font-medium leading-snug transition-colors duration-200 ${
          isOpen ? 'text-navy' : 'text-charcoal'
        }`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-200 mt-0.5 ${
          isOpen
            ? 'border-navy bg-navy text-white'
            : 'border-gray-200 bg-transparent text-slate-corporate'
        }`}>
          {isOpen ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pr-16">
              <p className="text-sm text-slate-corporate leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
