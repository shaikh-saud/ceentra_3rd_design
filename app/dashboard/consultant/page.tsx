"use client";

import { useState } from "react";
import ConsultantSidebar      from "@/app/components/dashboard/consultant/layout/ConsultantSidebar";
import ConsultantTopBar       from "@/app/components/dashboard/consultant/layout/ConsultantTopBar";
import ConsultantOverviewContent    from "@/app/components/dashboard/consultant/tabs/OverviewContent";
import ConsultantRequestsContent    from "@/app/components/dashboard/consultant/tabs/RequestsContent";
import ConsultantCalendarContent    from "@/app/components/dashboard/consultant/tabs/CalendarContent";
import ConsultantMessagesContent    from "@/app/components/dashboard/consultant/tabs/MessagesContent";
import ConsultantEarningsContent    from "@/app/components/dashboard/consultant/tabs/EarningsContent";
import ConsultantSettingsContent    from "@/app/components/dashboard/consultant/tabs/SettingsContent";
import ConsultantPlaceholderContent from "@/app/components/dashboard/consultant/tabs/PlaceholderContent";

const IMPLEMENTED = ["overview", "requests", "calendar", "messages", "earnings", "settings"];

export default function ConsultantDashboardPage() {
  const [activeTab, setActiveTab]     = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f4f6f9] overflow-hidden font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <ConsultantSidebar
        activeTab={activeTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ConsultantTopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === "overview"  && <ConsultantOverviewContent onTabChange={setActiveTab} />}
          {activeTab === "requests"  && <ConsultantRequestsContent />}
          {activeTab === "calendar"  && <ConsultantCalendarContent />}
          {activeTab === "messages"  && <ConsultantMessagesContent />}
          {activeTab === "earnings"  && <ConsultantEarningsContent />}
          {activeTab === "settings"  && <ConsultantSettingsContent />}
          {!IMPLEMENTED.includes(activeTab) && <ConsultantPlaceholderContent tab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
