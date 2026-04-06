import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import AboutMissionVision from "../components/AboutMissionVision";
import AboutCTA from "../components/AboutCTA";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutMissionVision />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
