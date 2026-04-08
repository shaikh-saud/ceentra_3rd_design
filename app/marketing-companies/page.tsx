"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import MarketingCompaniesHero from "../components/MarketingCompaniesHero";
import MarketingCompaniesListing from "../components/MarketingCompaniesListing";
import MarketingCompaniesCTA from "../components/MarketingCompaniesCTA";
import Footer from "../components/Footer";

export default function MarketingCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      <main className="pt-0">
        <MarketingCompaniesHero onSearch={setSearchQuery} />
        <MarketingCompaniesListing searchQuery={searchQuery} />
        <MarketingCompaniesCTA />
      </main>
      <Footer />
    </>
  );
}
