import Navbar from "../components/Navbar";
import JobsHero from "../components/JobsHero";
import JobsContent from "../components/JobsContent";
import Footer from "../components/Footer";

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <main>
        <JobsHero />
        <JobsContent />
      </main>
      <Footer />
    </>
  );
}
