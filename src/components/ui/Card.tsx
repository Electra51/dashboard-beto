import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export default function Card({
  children,
  className,
  padding = true,
}: CardProps) {
  return (
    <div
      className={clsx(
        "border border-[#b7ebde] rounded-lg shadow-sm ",
        padding && "p-6",
        className
      )}>
      {children}
    </div>
  );
}
