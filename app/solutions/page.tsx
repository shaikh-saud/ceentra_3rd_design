import Navbar from "../components/Navbar";
import SolutionsHero from "../components/SolutionsHero";
import SolutionEcommerce from "../components/SolutionEcommerce";
import SolutionAds from "../components/SolutionAds";
import SolutionDesign from "../components/SolutionDesign";
import SolutionMarketing from "../components/SolutionMarketing";
import Footer from "../components/Footer";

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionsHero />
        <SolutionEcommerce />
        <SolutionAds />
        <SolutionDesign />
        <SolutionMarketing />
      </main>
      <Footer />
    </>
  );
}
