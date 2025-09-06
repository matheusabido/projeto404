import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string
  className?: string
  rows?: number
}

export type TextInputRef = {
  value: string;
};

const TextInput = forwardRef<TextInputRef, Props>(({ label, className, rows }, ref) => {
  const [value, setValue] = useState("");

  useImperativeHandle(ref, () => ({
    value,
  }), [value]);

  return (
    <div className="relative flex flex-col">
      <InputLabel floating={!!value}>{label}</InputLabel>
      {rows === undefined && <input
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className={twMerge("border-[1px] border-gray-300 rounded-sm p-2 mt-4", className)}
        type="text"
      />}
      {rows !== undefined && <textarea
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className={twMerge("border-[1px] border-gray-300 rounded-sm p-2 mt-4 resize-none", className)}
        rows={rows}
      />}
    </div>
  );
});

export default TextInput;