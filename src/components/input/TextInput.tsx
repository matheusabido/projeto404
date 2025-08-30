import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import InputLabel from "./InputLabel";

type Props = {
  label?: string
}

export type TextInputRef = {
  value: string;
};

const TextInput = forwardRef<TextInputRef, Props>(({ label }, ref) => {
  const [value, setValue] = useState("");

  useImperativeHandle(ref, () => ({
    value,
  }), [value]);

  return (
    <div className="relative">
      <InputLabel floating={!!value}>{label}</InputLabel>
      <input
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className="border-[1px] border-gray-300 rounded-sm p-2 mt-4"
        type="text"
      />
    </div>
  );
});

export default TextInput;