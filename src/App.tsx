import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const CorporateTravel = lazy(() => import('./pages/CorporateTravel'));
const Services = lazy(() => import('./pages/Services'));
const WhyMKM = lazy(() => import('./pages/WhyMKM'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Contact = lazy(() => import('./pages/Contact'));

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">MKM Air Travels</span>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/corporate-travel"
            element={
              <PageTransition>
                <CorporateTravel />
              </PageTransition>
            }
          />
          <Route
            path="/services"
            element={
              <PageTransition>
                <Services />
              </PageTransition>
            }
          />
          <Route
            path="/why-mkm"
            element={
              <PageTransition>
                <WhyMKM />
              </PageTransition>
            }
          />
          <Route
            path="/faqs"
            element={
              <PageTransition>
                <FAQs />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen bg-white flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-slate-light uppercase tracking-widest mb-4">404 — Not Found</p>
                    <h1 className="text-4xl font-serif font-semibold text-navy mb-4">Page Not Found</h1>
                    <a href="/" className="btn-primary">Return Home</a>
                  </div>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
