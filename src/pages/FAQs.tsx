import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';
import { faqs, faqCategories } from '../data/faqs';

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <Helmet>
        <title>FAQs | MKM Air Travels Pvt. Ltd.</title>
        <meta
          name="description"
          content="Find answers about MKM's corporate travel services, group bookings, MICE travel, GST billing, visa support, credit facility, and contact options."
        />
        <link rel="canonical" href="https://mkmairtravels.com/faqs" />
      </Helmet>

      <PageHero
        eyebrow="FAQs"
        heading="Frequently Asked Questions"
        subheading="Quick answers about MKM's travel services and corporate support."
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <section className="section-pad bg-white">
        <div className="container-corporate">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-8">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-light"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 bg-white text-sm text-charcoal placeholder-slate-light/60 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors duration-200"
                aria-label="Search frequently asked questions"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter FAQs by category">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-navy text-white border-navy'
                      : 'bg-transparent text-slate-corporate border-gray-200 hover:border-navy/40 hover:text-navy'
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion list */}
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100"
                role="list"
              >
                {filtered.map((item) => (
                  <FAQAccordion
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 text-slate-light">
                <p className="text-sm">No questions found for your search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-3 text-sm text-navy hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Result count */}
            {(searchQuery || activeCategory !== 'All') && filtered.length > 0 && (
              <p className="mt-6 text-xs text-slate-light text-right">
                Showing {filtered.length} of {faqs.length} questions
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        heading="Didn't find what you were looking for?"
        subtext="Speak directly with the MKM team for any travel-related questions or requirements."
      />
    </>
  );
}
