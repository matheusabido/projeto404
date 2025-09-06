import { FaCloudArrowUp, FaX } from "react-icons/fa6";
import Button from "@/components/Button";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";

type Props = {
  label: string;
  className?: string;
};

export type FileInputRef= {
  value?: File;
};

const FileInput = forwardRef<FileInputRef, Props>(({ label, className }, ref) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<File>();

  useImperativeHandle(ref, () => ({
    value,
  }), [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    setValue(file);
  }

  return (
    <div className="flex flex-col">
      <input onChange={handleChange} type="file" className="hidden" ref={fileRef} />
      <Button
        variant="outline"
        className={className}
        onClick={() => {
          if (value) {
            setValue(undefined);
            return;
          }
          fileRef.current?.click();
        }}
      >
        <div className="flex gap-3 items-center justify-center">
          {!value && <FaCloudArrowUp className="text-xl" />}
          {value && <FaX className="text-sm" />}
          <p className="font-medium">{value ? value.name : label}</p>
        </div>
      </Button>
    </div>
  );
});

export default FileInput;