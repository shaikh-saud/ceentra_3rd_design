"use client";

import { useState } from "react";
import TrainerSidebar         from "@/app/components/dashboard/trainer/layout/TrainerSidebar";
import TrainerTopBar          from "@/app/components/dashboard/trainer/layout/TrainerTopBar";
import TrainerOverviewContent from "@/app/components/dashboard/trainer/tabs/OverviewContent";
import TrainerCoursesContent   from "@/app/components/dashboard/trainer/tabs/CoursesContent";
import TrainerStudentsContent  from "@/app/components/dashboard/trainer/tabs/StudentsContent";
import TrainerMessagesContent  from "@/app/components/dashboard/trainer/tabs/MessagesContent";
import TrainerReviewsContent   from "@/app/components/dashboard/trainer/tabs/ReviewsContent";
import TrainerEarningsContent  from "@/app/components/dashboard/trainer/tabs/EarningsContent";
import TrainerPlaceholderContent from "@/app/components/dashboard/trainer/tabs/PlaceholderContent";

const IMPLEMENTED = ["overview", "courses", "students", "messages", "reviews", "earnings"];

export default function TrainerDashboardPage() {
  const [activeTab, setActiveTab]     = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f4f6f9] overflow-hidden font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <TrainerSidebar
        activeTab={activeTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TrainerTopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === "overview" && <TrainerOverviewContent onTabChange={setActiveTab} />}
          {activeTab === "courses"   && <TrainerCoursesContent />}
          {activeTab === "students"  && <TrainerStudentsContent />}
          {activeTab === "messages"  && <TrainerMessagesContent />}
          {activeTab === "reviews"   && <TrainerReviewsContent />}
          {activeTab === "earnings"  && <TrainerEarningsContent />}
          {!IMPLEMENTED.includes(activeTab) && <TrainerPlaceholderContent tab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
