import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface ImageProps {
  width: number;
  height: number;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export default function ImageSection({
  width,
  height,
  imageSrc,
  imageAlt,
  className,
}: ImageProps) {
  return (
    <Image
      src={imageSrc}
      className={cn(
        "h-80 w-120 fill object-cover rounded-3xl shadow-2xl items-center",
        className
      )}
      width={width}
      height={height}
      alt={imageAlt}
      priority
    />
  );
}
