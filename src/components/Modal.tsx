import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { FaX } from "react-icons/fa6";

type Props = {
    children: ReactNode
    title: string
    isOpen?: boolean
    onClose?: () => void
}

export default function Modal({ children, title, isOpen, onClose }: Props) {
  return ReactDOM.createPortal(
    <div className={isOpen ? "opacity-100" : "opacity-0 pointer-events-none transition-all"}>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full backdrop-blur-[2px] bg-black/40 z-50"
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50 bg-white p-4 rounded w-[800px] max-w-[90vw] max-h-[90dvh] overflow-auto">
        <div className="border-b border-gray-300 mb-4 pb-2 flex items-center justify-between">
          <p className="text-lg font-medium flex-1">{title}</p>
          <FaX className="cursor-pointer text-gray-700 text-lg" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}