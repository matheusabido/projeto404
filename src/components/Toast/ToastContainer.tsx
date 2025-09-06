import ReactDOM from "react-dom";
import type { ReactNode } from "react";

type ToastContainerProps = {
  children: ReactNode;
};

export function ToastContainer({ children }: ToastContainerProps) {
  return ReactDOM.createPortal(
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-4">
      {children}
    </div>,
    document.getElementById("toast-root")!
  );
}
