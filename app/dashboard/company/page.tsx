"use client";

import { useState } from "react";
import CompanySidebar     from "@/app/components/dashboard/company/layout/CompanySidebar";
import CompanyTopBar      from "@/app/components/dashboard/company/layout/CompanyTopBar";
import CompanyOverviewContent    from "@/app/components/dashboard/company/tabs/OverviewContent";
import CompanyRequestsContent    from "@/app/components/dashboard/company/tabs/RequestsContent";
import CompanyOffersContent      from "@/app/components/dashboard/company/tabs/OffersContent";
import CompanyProjectsContent    from "@/app/components/dashboard/company/tabs/ProjectsContent";
import CompanyEarningsContent    from "@/app/components/dashboard/company/tabs/EarningsContent";
import CompanyMessagesContent    from "@/app/components/dashboard/company/tabs/MessagesContent";
import CompanySettingsContent    from "@/app/components/dashboard/company/tabs/SettingsContent";
import CompanyPlaceholderContent from "@/app/components/dashboard/company/tabs/PlaceholderContent";

const IMPLEMENTED = ["overview", "requests", "offers", "projects", "earnings", "messages", "settings"];

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f4f6f9] overflow-hidden font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <CompanySidebar
        activeTab={activeTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyTopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === "overview"  && <CompanyOverviewContent onTabChange={setActiveTab} />}
          {activeTab === "requests"  && <CompanyRequestsContent />}
          {activeTab === "offers"    && <CompanyOffersContent />}
          {activeTab === "projects"  && <CompanyProjectsContent />}
          {activeTab === "earnings"  && <CompanyEarningsContent />}
          {activeTab === "messages"  && <CompanyMessagesContent />}
          {activeTab === "settings"  && <CompanySettingsContent />}
          {!IMPLEMENTED.includes(activeTab) && <CompanyPlaceholderContent tab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
