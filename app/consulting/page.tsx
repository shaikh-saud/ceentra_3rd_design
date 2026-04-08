import Navbar from "../components/Navbar";
import ConsultingHero from "../components/ConsultingHero";
import ConsultingTypes from "../components/ConsultingTypes";
import ConsultingExperts from "../components/ConsultingExperts";
import ConsultingHowItWorks from "../components/ConsultingHowItWorks";
import ConsultingCTA from "../components/ConsultingCTA";
import Footer from "../components/Footer";

export default function ConsultingPage() {
  return (
    <>
      <Navbar />
      <main>
        <ConsultingHero />
        <ConsultingTypes />
        <ConsultingExperts />
        <ConsultingHowItWorks />
        <ConsultingCTA />
      </main>
      <Footer />
    </>
  );
}
