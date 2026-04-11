"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/dashboard/admin/layout/AdminSidebar";
import AdminTopBar  from "@/app/components/dashboard/admin/layout/AdminTopBar";
import OverviewContent  from "@/app/components/dashboard/admin/tabs/OverviewContent";
import UsersContent     from "@/app/components/dashboard/admin/tabs/UsersContent";
import CoursesContent   from "@/app/components/dashboard/admin/tabs/CoursesContent";
import PaymentsContent  from "@/app/components/dashboard/admin/tabs/PaymentsContent";
import JobsContent      from "@/app/components/dashboard/admin/tabs/JobsContent";
import ServicesContent   from "@/app/components/dashboard/admin/tabs/ServicesContent";
import CompaniesContent   from "@/app/components/dashboard/admin/tabs/CompaniesContent";
import ConsultantsContent from "@/app/components/dashboard/admin/tabs/ConsultantsContent";
import CreatorsContent    from "@/app/components/dashboard/admin/tabs/CreatorsContent";
import AlertsContent      from "@/app/components/dashboard/admin/tabs/AlertsContent";
import MessagesContent    from "@/app/components/dashboard/admin/tabs/MessagesContent";
import RequestsContent    from "@/app/components/dashboard/admin/tabs/RequestsContent";
import DisputesContent    from "@/app/components/dashboard/admin/tabs/DisputesContent";
import PlaceholderContent from "@/app/components/dashboard/admin/tabs/PlaceholderContent";

const IMPLEMENTED = ["overview", "users", "courses", "payments", "jobs", "services", "companies", "consultants", "creators", "alerts", "messages", "requests", "disputes"];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab]       = useState("overview");
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f4f6f9] overflow-hidden font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <AdminSidebar
        activeTab={activeTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === "overview"  && <OverviewContent />}
          {activeTab === "users"     && <UsersContent />}
          {activeTab === "courses"   && <CoursesContent />}
          {activeTab === "payments"  && <PaymentsContent />}
          {activeTab === "jobs"      && <JobsContent />}
          {activeTab === "services"  && <ServicesContent />}
          {activeTab === "companies"   && <CompaniesContent />}
          {activeTab === "consultants" && <ConsultantsContent />}
          {activeTab === "creators"    && <CreatorsContent />}
          {activeTab === "alerts"      && <AlertsContent />}
          {activeTab === "messages"    && <MessagesContent />}
          {activeTab === "requests"    && <RequestsContent />}
          {activeTab === "disputes"    && <DisputesContent />}
          {!IMPLEMENTED.includes(activeTab) && <PlaceholderContent tab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
