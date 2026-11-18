import { CursorProvider } from "./lib/cursor";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/hero/HeroSection";
import { MotionOrbit } from "./components/portfolio/MotionOrbit";
import { CinematicShowcase } from "./components/showcase/CinematicShowcase";
import { ServicesSection } from "./components/services/ServicesSection";
import { WhySection } from "./components/why/WhySection";
import { ProcessTimeline } from "./components/process/ProcessTimeline";
import { PricingSection } from "./components/pricing/PricingSection";
import { FinalCTA } from "./components/cta/FinalCTA";
import { ContactForm } from "./components/contact/ContactForm";
import { ScrollExperience } from "./components/common/ScrollExperience";
import "./styles/studio.css";
import "./styles/services-illustrated.css";
import "./styles/cta-cinematic.css";
import "./styles/why-illustrated.css";
import "./styles/process-pricing-illustrated.css";
import "./styles/contact-neon.css";

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <Navbar />
      <ScrollExperience />
      <main>
        <HeroSection />
        <MotionOrbit />
        <CinematicShowcase />
        <ServicesSection />
        <WhySection />
        <ProcessTimeline />
        <PricingSection />
        <FinalCTA />
        <ContactForm />
      </main>
      <Footer />
      <div className="noise-overlay" aria-hidden="true" />
    </CursorProvider>
  );
}
