import { cn } from "@/lib/utils";
import Image from "next/image";

interface TitleProps {
  children: React.ReactNode;
  hasLogo?: boolean;
  className?: string;
}

export default function Title({ children, hasLogo, className }: TitleProps) {
  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex items-center gap-4">
        {hasLogo && (
          <Image
            hidden={!hasLogo}
            src="/assets/logo-head.png"
            className="h-15 w-12 "
            width={350}
            height={435}
            alt="HHH Logo"
            priority
          />
        )}

        <h1
          className={cn(
            "w-min font-serif text-4xl leading-tight  font-semibold text-primary"
          )}
        >
          {children}
        </h1>
      </div>
    </div>
  );
}
