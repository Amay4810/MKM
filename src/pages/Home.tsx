import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import StatsStrip from '../components/sections/StatsStrip';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import ServicesPreview from '../components/sections/ServicesPreview';
import CorporateHighlight from '../components/sections/CorporateHighlight';
import WhyMKMPreview from '../components/sections/WhyMKMPreview';
import FAQPreview from '../components/sections/FAQPreview';
import CTASection from '../components/ui/CTASection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MKM Air Travels Pvt. Ltd. | Corporate Travel Company in New Delhi</title>
        <meta
          name="description"
          content="MKM Air Travels Pvt. Ltd. is an IATA accredited and TAAI affiliated travel management company with 25+ years of expertise in corporate travel, group handling, MICE, flights, hotels, visas, and transfers."
        />
        <meta name="keywords" content="corporate travel company Delhi, IATA accredited travel agent India, travel management company New Delhi, MICE travel agency, group travel handling, corporate flight booking, hotel booking agent Delhi, visa assistance India, airport transfer Delhi, TAAI affiliated travel agent" />
        <link rel="canonical" href="https://mkmairtravels.in/" />

        {/* Open Graph */}
        <meta property="og:title" content="MKM Air Travels Pvt. Ltd. | Corporate Travel Company in New Delhi" />
        <meta property="og:description" content="IATA accredited and TAAI affiliated travel management company. 25+ years of corporate travel expertise. New Delhi, India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkmairtravels.in/" />
        <meta property="og:site_name" content="MKM Air Travels Pvt. Ltd." />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MKM Air Travels Pvt. Ltd. | Corporate Travel Company in New Delhi" />
        <meta name="twitter:description" content="IATA accredited and TAAI affiliated travel management company. 25+ years of corporate travel expertise. New Delhi, India." />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="New Delhi" />
        <meta name="geo.position" content="28.6288696;77.0912057" />
        <meta name="ICBM" content="28.6288696, 77.0912057" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://mkmairtravels.in/#organization",
                "name": "MKM Air Travels Pvt. Ltd.",
                "url": "https://mkmairtravels.in",
                "description": "IATA accredited and TAAI affiliated travel management company with 25+ years of expertise in corporate travel, group handling, MICE, flights, hotels, visas, and transfers.",
                "foundingDate": "1999",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "B Block, 207, Mahatta Tower, Community Centre, Janakpuri",
                  "addressLocality": "New Delhi",
                  "addressRegion": "Delhi",
                  "postalCode": "110058",
                  "addressCountry": "IN"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+91-98734-79705",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                  }
                ],
                "email": "mkmairtravels@gmail.com",
                "taxID": "07AADCM0123G1Z1",
                "sameAs": []
              },
              {
                "@type": "TravelAgency",
                "@id": "https://mkmairtravels.in/#localbusiness",
                "name": "MKM Air Travels Pvt. Ltd.",
                "image": "https://mkmairtravels.in/favicon.svg",
                "url": "https://mkmairtravels.in",
                "telephone": "+91-98734-79705",
                "email": "mkmairtravels@gmail.com",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "B Block, 207, Mahatta Tower, Community Centre, Janakpuri",
                  "addressLocality": "New Delhi",
                  "addressRegion": "Delhi",
                  "postalCode": "110058",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 28.6288696,
                  "longitude": 77.0912057
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:30",
                    "closes": "18:30"
                  }
                ],
                "areaServed": {
                  "@type": "Country",
                  "name": "India"
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://mkmairtravels.in/#website",
                "url": "https://mkmairtravels.in",
                "name": "MKM Air Travels Pvt. Ltd.",
                "publisher": { "@id": "https://mkmairtravels.in/#organization" }
              }
            ]
          })}
        </script>
      </Helmet>

      <HeroSection />
      <StatsStrip />
      <AboutSnapshot />
      <ServicesPreview />
      <CorporateHighlight />
      <WhyMKMPreview />
      <FAQPreview />
      <CTASection
        heading="Looking for a reliable travel partner?"
        subtext="Speak with the MKM team for corporate travel requirements, group movements, MICE travel, documentation support, or individual travel assistance."
      />
    </>
  );
}
