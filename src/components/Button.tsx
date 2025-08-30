import type { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function Button({ children }: Props) {
  return <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-md cursor-pointer transition-all">
    {children}
  </button>;
}