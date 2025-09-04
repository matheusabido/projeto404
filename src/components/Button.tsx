import clsx from "clsx";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode
  variant?: "primary" | "outline"
  to?: string
  onClick?: () => void
}

export default function Button({ children, variant="primary", to, onClick }: Props) {
  const navigate = useNavigate();
  return <button onClick={to ? () => navigate(to) : onClick} className={clsx(
    "p-2 px-4 rounded-md cursor-pointer transition-all",
    variant === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
    variant === "outline" && "border border-gray-700 hover:bg-gray-200",
  )}>
    {children}
  </button>;
}