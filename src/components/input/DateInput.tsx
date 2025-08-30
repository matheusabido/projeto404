import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import InputLabel from "./InputLabel";

type Props = {
  label?: string
}

export type DateInputRef = {
  value: string;
  convertedValue?: string;
};

const DateInput = forwardRef<DateInputRef, Props>(({ label }, ref) => {
  const [value, setValue] = useState("");

  useImperativeHandle(ref, () => ({
    value,
  }), [value]);

  return (
    <div className="relative">
      <InputLabel floating={true}>{label}</InputLabel>
      <input
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className="border-[1px] border-gray-300 rounded-sm p-2 mt-4"
        type="date"
      />
    </div>
  );
});

export default DateInput;