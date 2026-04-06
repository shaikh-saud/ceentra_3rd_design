import { cn } from "@/lib/utils";

export function FeaturesSectionWithHoverEffects({
  features,
}: {
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} total={features.length} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  total,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  total: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature border-gray-200 overflow-hidden",
        // Left border between columns (RTL)
        "lg:border-l",
        (index % 3 === 2) && "lg:border-l-0",
        // Bottom border for first row
        index < 3 && "lg:border-b",
        // Mobile: bottom border on all except last
        "border-b",
        index === total - 1 && "border-b-0",
      )}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="mb-4 relative z-10 px-10 text-primary/70">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute right-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tl-full rounded-bl-full bg-gray-200 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:-translate-x-2 transition duration-200 inline-block text-text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-text-secondary max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

