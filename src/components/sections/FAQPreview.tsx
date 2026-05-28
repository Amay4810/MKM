import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FAQAccordion from '../ui/FAQAccordion';
import { faqs } from '../../data/faqs';

export default function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const preview = faqs.slice(0, 5);

  return (
    <section className="section-pad bg-white" aria-labelledby="faq-preview-heading">
      <div className="container-corporate">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left heading */}
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Frequently Asked"
              title="Common Questions About MKM's Services"
              className="sticky top-28"
            />
            <div className="mt-8">
              <Link
                to="/faqs"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors duration-200"
              >
                View All FAQs
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-gray-100" role="list">
              {preview.map((item) => (
                <FAQAccordion
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
