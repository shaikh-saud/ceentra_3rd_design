import Navbar from "@/app/components/Navbar";
import HowItWorks from "@/app/components/HowItWorks";
import Footer from "@/app/components/Footer";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-[#F7F9F9]">
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
