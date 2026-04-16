"use client";

import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import SearchInput from "../ui/SearchInput";
import FilterDropdown from "../ui/FilterDropdown";
import TableCard, { TableHead, EmptyRow, StatusBadge, Badge } from "../ui/TableCard";
import PaginationRow from "../ui/PaginationRow";
import ActionBtn from "../ui/ActionBtn";

type UserType = "client" | "company" | "consultant" | "trainer" | "creator";

interface AppUser {
  id: number; name: string; email: string; phone: string;
  type: UserType; registeredAt: string; status: "active" | "inactive";
  initials: string; avatarColor: string;
}

const MOCK_USERS: AppUser[] = [
  { id:1,  name:"أحمد محمد العتيبي",    email:"ahmed@example.com",   phone:"+966 50 123 4567", type:"client",     registeredAt:"2024-01-15", status:"active", initials:"أح", avatarColor:"from-blue-500 to-blue-600" },
  { id:2,  name:"شركة الإبداع الرقمي",  email:"info@ibdaa.sa",       phone:"+966 11 456 7890", type:"company",    registeredAt:"2024-01-18", status:"active", initials:"شإ", avatarColor:"from-teal-500 to-teal-600" },
  { id:3,  name:"د. سارة الشمري",       email:"sara@consultant.sa",  phone:"+966 55 987 6543", type:"consultant", registeredAt:"2024-01-20", status:"active", initials:"سش", avatarColor:"from-purple-500 to-purple-600" },
  { id:4,  name:"محمد خالد الدوسري",    email:"mkd@trainer.sa",      phone:"+966 54 321 0987", type:"trainer",    registeredAt:"2024-01-22", status:"active", initials:"مد", avatarColor:"from-orange-500 to-orange-600" },
  { id:5,  name:"نورة عبدالله القحطاني",email:"noura@content.sa",    phone:"+966 56 111 2233", type:"creator",    registeredAt:"2024-01-25", status:"active", initials:"نق", avatarColor:"from-pink-500 to-pink-600" },
  { id:6,  name:"فيصل العمر",           email:"faisal@client.com",   phone:"+966 50 444 5566", type:"client",     registeredAt:"2024-01-28", status:"active", initials:"فع", avatarColor:"from-blue-400 to-blue-500" },
  { id:7,  name:"مجموعة النخيل للتقنية",email:"tech@nakheel.sa",     phone:"+966 12 789 0123", type:"company",    registeredAt:"2024-02-01", status:"active", initials:"من", avatarColor:"from-teal-400 to-teal-500" },
  { id:8,  name:"عمر الزهراني",         email:"omar.z@gmail.com",    phone:"+966 53 667 8899", type:"client",     registeredAt:"2024-02-03", status:"active", initials:"عز", avatarColor:"from-blue-600 to-indigo-600" },
  { id:9,  name:"أ. ريم السعدي",        email:"reem@training.sa",    phone:"+966 55 234 5678", type:"trainer",    registeredAt:"2024-02-07", status:"active", initials:"رس", avatarColor:"from-orange-400 to-amber-500" },
  { id:10, name:"لمى أحمد الجهني",      email:"lama@creator.sa",     phone:"+966 57 998 7766", type:"creator",    registeredAt:"2024-02-10", status:"active", initials:"لج", avatarColor:"from-pink-400 to-rose-500" },
  { id:11, name:"خالد ابراهيم الحربي",  email:"khalid.h@consult.sa", phone:"+966 50 556 6677", type:"consultant", registeredAt:"2024-02-12", status:"active", initials:"خح", avatarColor:"from-purple-400 to-violet-600" },
  { id:12, name:"شركة تقني للحلول",     email:"contact@tqni.com",    phone:"+966 11 333 4455", type:"company",    registeredAt:"2024-02-15", status:"active", initials:"شت", avatarColor:"from-teal-500 to-emerald-600" },
  { id:13, name:"هند الشريف",           email:"hind@client.sa",      phone:"+966 54 112 3344", type:"client",     registeredAt:"2024-02-18", status:"active", initials:"هش", avatarColor:"from-blue-500 to-cyan-500" },
  { id:14, name:"وليد مصطفى",           email:"waleed@trainer.sa",   phone:"+966 56 778 8990", type:"trainer",    registeredAt:"2024-02-20", status:"active", initials:"وم", avatarColor:"from-orange-500 to-red-500" },
  { id:15, name:"دانة الرشيد",          email:"dana@content.sa",     phone:"+966 55 009 8877", type:"creator",    registeredAt:"2024-02-22", status:"active", initials:"در", avatarColor:"from-pink-500 to-fuchsia-600" },
];

const TYPE_CONFIG: Record<UserType, { label: string; classes: string }> = {
  client:     { label:"عميل",       classes:"bg-blue-50 text-blue-600 border-blue-100" },
  company:    { label:"شركة",       classes:"bg-teal-50 text-teal-600 border-teal-100" },
  consultant: { label:"مستشار",     classes:"bg-purple-50 text-purple-600 border-purple-100" },
  trainer:    { label:"مدرب",       classes:"bg-orange-50 text-orange-600 border-orange-100" },
  creator:    { label:"صانع محتوى", classes:"bg-pink-50 text-pink-600 border-pink-100" },
};

const FILTER_OPTIONS = [
  { value:"all",        label:"جميع المستخدمين" },
  { value:"client",     label:"العملاء" },
  { value:"company",    label:"الشركات" },
  { value:"consultant", label:"المستشارين" },
  { value:"trainer",    label:"المدربين" },
  { value:"creator",    label:"صناع المحتوى" },
];

const COLS = ["#", "المستخدم", "النوع", "البريد الإلكتروني", "الهاتف", "تاريخ التسجيل", "الحالة", "الإجراءات"];
const PAGE_SIZE = 8;

export default function UsersContent() {
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("all");
  const [currentPage, setPage]      = useState(1);
  const [activeRow, setActiveRow]   = useState<number | null>(null);

  const filtered = useMemo(() => MOCK_USERS.filter((u) => {
    const matchType   = filter === "all" || u.type === filter;
    const matchSearch = !search || u.name.includes(search) || u.email.includes(search);
    return matchType && matchSearch;
  }), [search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilter = (v: string) => { setFilter(v); setPage(1); };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="إدارة المستخدمين"
        subtitle="إدارة وتنظيم جميع مستخدمي المنصة"
        badge="72 مستخدم"
        action={
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={handleSearch} placeholder="بحث عن مستخدم..." width="w-[220px]" />
            <FilterDropdown value={filter} options={FILTER_OPTIONS} onChange={handleFilter} />
          </div>
        }
      />

      <TableCard
        footer={
          <PaginationRow
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            itemLabel="مستخدم"
            onPageChange={setPage}
          />
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
            <tbody>
              {paginated.map((user, idx) => {
                const typeConf = TYPE_CONFIG[user.type];
                const isActive = activeRow === user.id;
                return (
                  <tr
                    key={user.id}
                    onClick={() => setActiveRow(isActive ? null : user.id)}
                    className={`border-b border-gray-50 cursor-pointer transition-all duration-150 animate-[fadeSlideUp_0.4s_ease-out] ${
                      isActive ? "bg-navy/4 border-navy/10" : "hover:bg-navy/[0.018]"
                    }`}
                    style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
                  >
                    <td className="px-5 py-4 text-[13px] font-bold text-[#0e2453]/40 whitespace-nowrap">
                      {(currentPage - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm`}>
                          {user.initials}
                        </div>
                        <span className="text-[14px] font-bold text-[#0e2453]">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Badge label={typeConf.label} classes={typeConf.classes} />
                    </td>
                    <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/60 whitespace-nowrap">{user.email}</td>
                    <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/60 whitespace-nowrap" dir="ltr">{user.phone}</td>
                    <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/60 whitespace-nowrap">
                      {new Date(user.registeredAt).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge active={user.status === "active"} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ActionBtn icon={Eye}    title="عرض"   base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]" />
                        <ActionBtn icon={Pencil} title="تعديل" base="border-amber-200 text-amber-500" hover="hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_4px_12px_rgba(245,158,11,0.35)]" />
                        <ActionBtn icon={Trash2} title="حذف"   base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_12px_rgba(239,68,68,0.35)]" />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && <EmptyRow colSpan={8} />}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginated.map((user, idx) => {
            const typeConf = TYPE_CONFIG[user.type];
            return (
              <div key={user.id} className="p-4 animate-[fadeSlideUp_0.4s_ease-out] hover:bg-gray-50/60 transition-colors"
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-[13px] font-extrabold shrink-0 shadow-sm`}>
                      {user.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0e2453]">{user.name}</p>
                      <p className="text-[12px] text-[#0e2453]/50">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge label={typeConf.label} classes={typeConf.classes} />
                    <StatusBadge active />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#0e2453]/40 font-medium" dir="ltr">{user.phone}</span>
                  <div className="flex items-center gap-1.5">
                    <ActionBtn icon={Eye}    title="عرض"   base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                    <ActionBtn icon={Pencil} title="تعديل" base="border-amber-200 text-amber-500" hover="hover:bg-amber-500 hover:text-white hover:border-amber-500" size="sm" />
                    <ActionBtn icon={Trash2} title="حذف"   base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                  </div>
                </div>
              </div>
            );
          })}
          {paginated.length === 0 && <p className="py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</p>}
        </div>
      </TableCard>
    </div>
  );
}
