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
        <meta property="og:title" content="MKM Air Travels Pvt. Ltd. | Corporate Travel Company in New Delhi" />
        <meta
          property="og:description"
          content="IATA accredited and TAAI affiliated travel management company. 25+ years of corporate travel expertise. New Delhi, India."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mkmairtravels.com/" />
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
