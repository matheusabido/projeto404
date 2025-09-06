import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string
  className?: string
}

export type DateInputRef = {
  value: string;
  convertedValue?: string;
};

const DateInput = forwardRef<DateInputRef, Props>(({ label, className }, ref) => {
  const [value, setValue] = useState("");

  useImperativeHandle(ref, () => ({
    value,
  }), [value]);

  return (
    <div className="relative flex flex-col">
      <InputLabel floating={true}>{label}</InputLabel>
      <input
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className={twMerge("border-[1px] border-gray-300 rounded-sm p-2 mt-4", className)}
        type="date"
      />
    </div>
  );
});

export default DateInput;