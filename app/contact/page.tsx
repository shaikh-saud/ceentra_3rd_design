import Navbar from "../components/Navbar";
import ContactHero from "../components/ContactHero";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
