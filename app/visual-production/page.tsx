import Navbar from "../components/Navbar";
import VisualProductionHero from "../components/VisualProductionHero";
import VisualProductionServices from "../components/VisualProductionServices";
import VisualProductionPortfolio from "../components/VisualProductionPortfolio";
import Footer from "../components/Footer";

export default function VisualProductionPage() {
  return (
    <>
      <Navbar />
      <main>
        <VisualProductionHero />
        <VisualProductionServices />
        <VisualProductionPortfolio />
      </main>
      <Footer />
    </>
  );
}
