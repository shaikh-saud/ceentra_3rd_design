import { cn } from "@/lib/utils";
import {
  Building2,
  FileText,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Video,
} from "lucide-react";

export default function Services() {
  const features = [
    {
      title: "شركات التسويق",
      description: "تصفح أفضل شركات التسويق الرقمي الموثوقة في المملكة",
      icon: <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
    {
      title: "طلبات العملاء",
      description: "أنشئ طلبك واحصل على عروض من شركات متخصصة",
      icon: <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
    {
      title: "الاستشارات",
      description: "احصل على استشارات تسويقية من خبراء معتمدين",
      icon: <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
    {
      title: "الوظائف",
      description: "استعرض فرص العمل في مجال التسويق الرقمي",
      icon: <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
    {
      title: "الدورات والتدريب",
      description: "طوّر مهاراتك من خلال برامج تدريبية متخصصة",
      icon: <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
    {
      title: "الإنتاج المرئي",
      description: "خدمات تصوير وإنتاج محتوى احترافي لعلامتك التجارية",
      icon: <Video className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />,
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-bg-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(5,139,127,0.03) 0%, transparent 100%)" }} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] text-primary py-1.5 px-4 text-[13px] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
            خدماتنا
          </span>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold text-text-primary tracking-tight">
            اختر الخدمة التي تناسب احتياجاتك
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10 bg-white border-y border-border/40 shrink-0">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} total={features.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  total: number;
};

const Feature = ({ title, description, icon, index, total }: FeatureProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-12 px-6 sm:px-8 relative group/feature border-border/40 transition-all duration-300 hover:bg-[#fafafa]",
        // Desktop (6 cols)
        index < total - 1 && "xl:border-l xl:border-b-0",
        // Tablet (3 cols)
        "lg:border-b-0 lg:border-l",
        (index + 1) % 3 === 0 && "lg:border-l-0", // remove left border on the last item of each row in 3x2 grid
        index < 3 && "lg:border-b", // add bottom border to first row in 3x2 grid
        // Mobile (1 or 2 cols)
        "border-b",
        index === total - 1 && "border-b-0 sm:border-b-0"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/[0.02] to-transparent pointer-events-none" />

      <div className="mb-6 relative z-10 text-primary/80 group-hover/feature:text-primary transition-colors duration-300 group-hover/feature:scale-110 transform">
        {icon}
      </div>

      <div className="text-[17px] sm:text-[18px] font-bold text-text-primary mb-3 relative z-10">
        <div className="absolute right-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tl-full rounded-bl-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center -mr-6 sm:-mr-8" />
        <span className="group-hover/feature:-translate-x-1 transition duration-200 inline-block">
          {title}
        </span>
      </div>

      <p className="text-[13px] sm:text-[14px] leading-relaxed text-text-secondary max-w-[200px] relative z-10">
        {description}
      </p>
    </div>
  );
};
