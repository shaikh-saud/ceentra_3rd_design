import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PricingSection from "@/components/ui/pricing-section";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function SubscriptionsPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen relative overflow-hidden bg-[#F7F9F9] pt-12 pb-24">
        
        {/* Animated Grid Pattern */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.05}
          duration={3}
          className="text-[#058B7F]"
        />

        {/* Floating Teal & Navy blurred orbs for standard 2-color themed aesthetics */}
        <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#058B7F] opacity-[0.05] blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#0e2453] opacity-[0.04] blur-[100px] pointer-events-none z-0" />

        {/* Page Content wrapped for layering */}
        <div className="relative z-10 pt-20">
            <PricingSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
