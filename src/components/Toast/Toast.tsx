import clsx from "clsx";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export type ToastType = "success" | "error";

type ToastProps = {
  type: ToastType;
  title: string;
  message: string;
};

export function Toast({ type, title, message }: ToastProps) {
  const icon = type === "success" ? (
    <FaCircleCheck className="text-green-500 text-xl" />
  ) : (
    <FaCircleXmark className="text-red-500 text-xl" />
  );

  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow p-4 min-w-[320px] max-w-[400px] border-l-4",
        type === "success" ? "border-green-500" : "border-red-500",
        "slideIn"
      )}
      role="alert"
    >
      <div className="flex gap-3 items-center">
        {icon}
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}