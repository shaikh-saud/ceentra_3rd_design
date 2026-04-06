"use client";

import DotPattern from "@/components/ui/dot-pattern";
import Particles from "@/components/ui/particles";
import { cn } from "@/lib/utils";

export const BackgroundPattern = () => {
  return (
    <>
      <DotPattern
        className={cn(
          "mask-[radial-gradient(ellipse,rgba(0,0,0,0.5)_40%,black_70%)]",
          "fill-primary/30"
        )}
        cr={1.2}
        cx={1}
        cy={1}
        height={22}
        width={22}
      />
      <Particles
        className="absolute inset-0"
        color="#058B7F"
        ease={80}
        quantity={80}
        size={0.5}
        refresh
      />
    </>
  );
};
