"use client";

import { useState } from "react";
import ClientSidebar     from "@/app/components/dashboard/client/layout/ClientSidebar";
import ClientTopBar      from "@/app/components/dashboard/client/layout/ClientTopBar";
import ClientOverviewContent    from "@/app/components/dashboard/client/tabs/OverviewContent";
import MarketingContent          from "@/app/components/dashboard/client/tabs/MarketingContent";
import ClientRequestsContent     from "@/app/components/dashboard/client/tabs/RequestsContent";
import ClientJobsContent         from "@/app/components/dashboard/client/tabs/JobsContent";
import ClientCoursesContent        from "@/app/components/dashboard/client/tabs/CoursesContent";
import ClientConsultationsContent    from "@/app/components/dashboard/client/tabs/ConsultationsContent";
import ClientVisualProductionContent from "@/app/components/dashboard/client/tabs/VisualProductionContent";
import ClientPaymentsContent           from "@/app/components/dashboard/client/tabs/PaymentsContent";
import ClientSubscriptionsContent     from "@/app/components/dashboard/client/tabs/SubscriptionsContent";
import ClientPurchasesContent        from "@/app/components/dashboard/client/tabs/PurchasesContent";
import ClientMessagesContent           from "@/app/components/dashboard/client/tabs/MessagesContent";
import ClientNotificationsContent     from "@/app/components/dashboard/client/tabs/NotificationsContent";
import ClientSettingsContent          from "@/app/components/dashboard/client/tabs/SettingsContent";
import ClientPlaceholderContent       from "@/app/components/dashboard/client/tabs/PlaceholderContent";

const IMPLEMENTED = ["overview", "marketing", "requests", "jobs", "courses", "consultations", "visual", "payments", "subscriptions", "purchases", "messages", "notifications", "settings"];

export default function ClientDashboardPage() {
  const [activeTab, setActiveTab]     = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f4f6f9] overflow-hidden font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <ClientSidebar
        activeTab={activeTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientTopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === "overview"  && <ClientOverviewContent />}
          {activeTab === "marketing" && <MarketingContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "requests"  && <ClientRequestsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "jobs"      && <ClientJobsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "courses"        && <ClientCoursesContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "consultations"  && <ClientConsultationsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "visual"         && <ClientVisualProductionContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "payments"       && <ClientPaymentsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "subscriptions"  && <ClientSubscriptionsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "purchases"      && <ClientPurchasesContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "messages"       && <ClientMessagesContent />}
          {activeTab === "notifications"  && <ClientNotificationsContent onBack={() => setActiveTab("overview")} />}
          {activeTab === "settings"       && <ClientSettingsContent onTabChange={setActiveTab} />}
          {!IMPLEMENTED.includes(activeTab) && <ClientPlaceholderContent tab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
