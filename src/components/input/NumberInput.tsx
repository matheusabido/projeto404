import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string
  decimal?: boolean
  className?: string
}

export type NumberInputRef = {
  value: string;
  convertedValue?: number;
};

const NumberInput = forwardRef<NumberInputRef, Props>(({ label, decimal, className }, ref) => {
  const [value, setValue] = useState("");
  const [convertedValue, setConvertedValue] = useState<number | undefined>(undefined);  

  useImperativeHandle(ref, () => ({
    value,
    convertedValue,
  }), [value, convertedValue]);

  function handleInput(input: string) {
    const raw = input.replaceAll(/\D+/g, "");
    let number = parseFloat(raw);

    if (Number.isNaN(number) || (raw.length > 1 && number === 0)) {
      setValue("");
      setConvertedValue(undefined);
      return;
    }
    
    if (decimal) {
      number /= 100;
      setValue(number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      }));
    } else {
      setValue(number.toLocaleString("pt-BR"));
    }
    setConvertedValue(number);
  }

  return (
    <div className="relative flex flex-col flex-1">
      <InputLabel floating={!!value}>{label}</InputLabel>
      <input
        value={value}
        onInput={(e) => handleInput(e.currentTarget.value)}
        className={twMerge("border-[1px] border-gray-300 rounded-sm p-2 mt-4", className)}
        type="text"
      />
    </div>
  );
});

export default NumberInput;