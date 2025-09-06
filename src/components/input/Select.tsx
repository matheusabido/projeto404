import type { ReactNode } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import InputLabel from "./InputLabel";

type Props = {
  children: ReactNode;
  label: string;
};

export type SelectRef = {
  value: string;
};

const Select = forwardRef<SelectRef, Props>(({ label, children }, ref) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    get value() {
      return selectRef.current?.value ?? "";
    },
  }));

  return (
    <div className="relative flex flex-col">
      <InputLabel floating={true}>{label}</InputLabel>
      <select
        ref={selectRef}
        className="border mt-4 border-gray-300 shadow-sm rounded px-2 py-3 text-sm"
      >
        {children}
      </select>
    </div>
  );
});

export default Select;