import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  floating?: boolean;
};

const InputLabel = ({ children, floating }: Props) => (
  <div className={clsx(
    "absolute left-1 z-10 pointer-events-none transition-all",
    floating ? "top-0" : "top-9 -translate-y-[50%]"
  )}>
    <p className={clsx("px-1 text-sm text-gray-700", floating && "bg-white")}>{children}</p>
  </div>
);

export default InputLabel;
