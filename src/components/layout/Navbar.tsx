import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, contactInfo } from '../../data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-corporate ${
          scrolled
            ? 'bg-navy shadow-nav border-b border-white/10'
            : 'bg-navy/95 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <div className="container-corporate">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col leading-none group focus-visible:outline-none"
              aria-label="MKM Air Travels — Home"
            >
              <span className="text-lg font-serif font-semibold text-white tracking-tight group-hover:text-ivory transition-colors duration-200">
                MKM Air Travels
              </span>
              <span className="text-[10px] font-sans font-normal text-white/50 tracking-[0.18em] uppercase mt-0.5">
                Pvt. Ltd.
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-px bg-white/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={14} strokeWidth={2} />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 text-white hover:text-white/70 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy pt-16 lg:hidden overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="container-corporate py-8">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center py-4 text-lg font-medium border-b border-white/10 transition-colors duration-200 ${
                        isActive(item.path) ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                  className="btn-outline-white w-full justify-center text-base py-4"
                >
                  Call Us
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white w-full justify-center text-base py-4"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-8 text-white/40 text-sm">
                <p>IATA Accredited · TAAI Affiliated</p>
                <p className="mt-1">New Delhi, India · Est. 1999</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
