import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ServicesCarousel from "./components/ServicesCarousel";
import AboutUs from "./components/AboutUs";
import FAQWithSpiral from "@/components/ui/faq-section";
import TrustSection from "./components/TrustSection";
import PricingSection from "@/components/ui/pricing-section";
import FeaturedRequests from "./components/FeaturedRequests";
import LatestRequests from "./components/LatestRequests";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import HomeContactSection from "./components/HomeContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ServicesCarousel />
        <AboutUs />
        <TrustSection />
        <PricingSection />
        <FeaturedRequests />
        <LatestRequests />
        <Testimonials />
        <FAQWithSpiral />
        <FinalCTA />
        <HomeContactSection />
      </main>
      <Footer />
    </>
  );
}
