"use client";

import React from "react";
import { FolderOpen, Zap } from "lucide-react";
import ProjectCard, { ProjectCardData } from "../ui/ProjectCard";

const PROJECTS: ProjectCardData[] = [
  { title:"حملة إعلانات مطعم", id:"#A12", progress:70, price:"20,000 ر.س", duration:"5 أسابيع" },
  { title:"حملة محتوى متجر",   id:"#B45", progress:80, price:"25,000 ر.س", duration:"6 أسابيع" },
  { title:"حملة SEO عيادة",   id:"#C78", progress:90, price:"30,000 ر.س", duration:"7 أسابيع" },
];

export default function CompanyProjectsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0e2453] leading-tight mb-1">
            مرحباً، Digital Creative Marketing Co
          </h1>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">إدارة طلباتك، عروضك، ومشاريعك الحالية</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            شركة موثقة
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3 h-3" />
            سريعة الرد
          </span>
        </div>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <FolderOpen className="w-4 h-4 text-[#058B7F]" />
        </div>
        <div>
          <h2 className="text-[20px] font-extrabold text-[#0e2453] leading-tight">مشاريعي الحالية</h2>
          <p className="text-[12px] text-[#0e2453]/40 font-medium">{PROJECTS.length} مشاريع نشطة</p>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} data={project} delay={idx * 80} />
        ))}
      </div>
    </div>
  );
}
