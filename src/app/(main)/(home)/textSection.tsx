import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextSectionProps {
  children: ReactNode;
  className?: string;
}

export default function TextSection({ children, className }: TextSectionProps) {
  return <p className={cn("text-xl lg:text-2xl", className)}>{children}</p>;
}
