import clsx from "clsx";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode
  className?: string
  variant?: "primary" | "outline"
  to?: string
  size?: "sm" | "md"
  onClick?: () => void
}

export default function Button({ children, size="md", variant="primary", to, onClick, className }: Props) {
  const navigate = useNavigate();
  return <button onClick={to ? () => navigate(to) : onClick} className={twMerge(clsx(
    "rounded-md cursor-pointer transition-all shadow-sm",
    variant === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
    variant === "outline" && "border border-gray-300 hover:bg-gray-100",
    size === "sm" && "text-sm p-1.5 px-3",
    size === "md" && "p-2 px-4",
  ), className)}>
    {children}
  </button>;
}