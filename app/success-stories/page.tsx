import Navbar from "../components/Navbar";
import CaseStudiesHero from "../components/CaseStudiesHero";
import CaseStudies from "../components/CaseStudies";
import CaseStudiesCTA from "../components/CaseStudiesCTA";
import Footer from "../components/Footer";

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudiesHero />
        <CaseStudies />
        <CaseStudiesCTA />
      </main>
      <Footer />
    </>
  );
}
