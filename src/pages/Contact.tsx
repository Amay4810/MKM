import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import { contactInfo } from '../data/navigation';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.subject) errors.subject = 'Please select a subject.';
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (errors[name as keyof FormState]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      // Scroll to first error
      const firstErrorField = Object.keys(validation)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_company: form.company || 'N/A',
          from_email: form.email,
          from_phone: form.phone || 'N/A',
          subject: form.subject,
          message: form.message,
          reply_to: form.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitError(
        'Sorry, your message could not be sent. Please try emailing us directly or calling us.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 border bg-white text-sm text-charcoal placeholder-slate-light/60 focus:outline-none focus:ring-1 transition-colors duration-200';
  const inputNormal = `${inputBase} border-gray-200 focus:border-navy focus:ring-navy`;
  const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-400`;

  const getInputClass = (field: keyof FormState) =>
    errors[field] ? inputError : inputNormal;

  return (
    <>
      <Helmet>
        <title>Contact MKM Air Travels Pvt. Ltd. | New Delhi</title>
        <meta
          name="description"
          content="Contact MKM Air Travels for corporate travel, group movements, MICE travel, flights, hotels, visas, transfers, and travel assistance."
        />
        <link rel="canonical" href="https://mkmairtravels.com/contact" />
      </Helmet>

      <PageHero
        eyebrow="Contact Us"
        heading="Contact MKM Air Travels"
        subheading="Speak directly with our team for corporate travel, group travel, MICE movements, flights, hotels, visas, transfers, or other travel requirements."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="section-pad bg-white">
        <div className="container-corporate">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — Contact info */}
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Get in Touch"
                title="The fastest way to reach us is by call or WhatsApp."
                className="mb-10"
              />

              {/* Quick CTAs */}
              <div className="flex flex-col gap-3 mb-10">
                <a
                  href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                  className="btn-primary justify-center sm:justify-start"
                  aria-label={`Call MKM at ${contactInfo.phones[0]}`}
                >
                  <Phone size={15} strokeWidth={2} />
                  Call Now — {contactInfo.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center sm:justify-start"
                  aria-label="Contact MKM on WhatsApp"
                >
                  <MessageCircle size={15} strokeWidth={2} />
                  WhatsApp Us
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="btn-secondary justify-center sm:justify-start"
                  aria-label={`Email MKM at ${contactInfo.email}`}
                >
                  <Mail size={15} strokeWidth={2} />
                  Email Us
                </a>
              </div>

              {/* Contact details card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
                className="bg-section-alt border border-gray-100 p-7"
              >
                <address className="not-italic space-y-5">
                  <div className="flex gap-4">
                    <MapPin size={16} className="text-navy/40 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-1">Office</p>
                      <p className="text-sm text-slate-corporate leading-relaxed">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone size={16} className="text-navy/40 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-2">Phone &amp; WhatsApp</p>
                      <div className="space-y-1.5">
                        {contactInfo.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="block text-sm text-navy hover:text-navy-light transition-colors duration-200 font-medium"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail size={16} className="text-navy/40 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-1">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-navy hover:text-navy-light transition-colors duration-200 font-medium"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </address>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <p className="text-xs text-slate-light uppercase tracking-wider font-medium mb-1">GSTIN</p>
                  <p className="text-sm font-mono text-charcoal">{contactInfo.gstin}</p>
                </div>
              </motion.div>

              {/* Google Maps — exact pin from https://maps.app.goo.gl/kqAcgdRkQcyqpLQ8A */}
              <div className="mt-6">
                <iframe
                  title="MKM Air Travels Pvt. Ltd. — Mahatta Tower, Janakpuri, New Delhi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0297784286354!2d77.0912057!3d28.6288696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04bcca7aaaab%3A0xf7f6c687d85bcc2b!2sMKM+Air+Travels+Pvt.+Ltd.!5e0!3m2!1sen!2sin!4v1716633006000!5m2!1sen!2sin"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border border-gray-100 block"
                />
                <a
                  href="https://maps.app.goo.gl/kqAcgdRkQcyqpLQ8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-navy hover:underline font-medium"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-100 p-8 lg:p-10 shadow-card">
                <h2 className="text-xl font-serif font-semibold text-navy mb-1">Send an Enquiry</h2>
                <p className="text-sm text-slate-light mb-8">Fill in the form and we'll get back to you promptly.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <div className="w-14 h-14 border border-navy/20 flex items-center justify-center">
                      <CheckCircle size={24} className="text-navy/60" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-navy">Enquiry Sent!</h3>
                    <p className="text-sm text-slate-corporate max-w-xs">
                      Thank you, {form.name.split(' ')[0]}! Your enquiry has been sent directly to our team. We'll be in touch shortly. For urgent matters, call or WhatsApp us at{' '}
                      <a href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`} className="text-navy underline">
                        {contactInfo.phones[0]}
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); setErrors({}); }}
                      className="mt-4 text-sm text-navy hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact enquiry form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-navy/60">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={getInputClass('name')}
                          autoComplete="name"
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                          Company / Organisation
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company name (optional)"
                          className={getInputClass('company')}
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                          Email <span className="text-navy/60">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={getInputClass('email')}
                          autoComplete="email"
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className={getInputClass('phone')}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                        Subject / Travel Type <span className="text-navy/60">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className={`${getInputClass('subject')} cursor-pointer`}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        aria-invalid={!!errors.subject}
                      >
                        <option value="">Select a subject</option>
                        <option value="Corporate Travel">Corporate Travel Management</option>
                        <option value="Air Ticketing">Air Ticketing</option>
                        <option value="Hotels">Hotels &amp; Accommodation</option>
                        <option value="Visa">Visa &amp; Documentation</option>
                        <option value="Car Rentals">Car Rentals &amp; Transfers</option>
                        <option value="MICE">MICE &amp; Group Travel</option>
                        <option value="Leisure">Leisure Travel</option>
                        <option value="Forex">Forex &amp; Insurance</option>
                        <option value="General">General Enquiry</option>
                      </select>
                      {errors.subject && (
                        <p id="subject-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle size={12} /> {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wide">
                        Message <span className="text-navy/60">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please describe your travel requirement..."
                        className={`${getInputClass('message')} resize-none`}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-sm text-red-700"
                        role="alert"
                      >
                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      aria-label="Submit enquiry"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} strokeWidth={2} />
                          Send Enquiry
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-light mt-2">
                      For immediate assistance, call or WhatsApp {contactInfo.phones[0]}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
