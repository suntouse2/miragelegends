import { Check } from "lucide-react";

export default function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <span
      className={`flex items-center justify-center w-[16px] h-[16px] max-w-[16px] max-h-[16px] min-w-[16px] min-h-[16px] rounded-sm border border-white/10 ${
        checked ? "!bg-accent-100" : ""
      }`}
      onClick={onChange}
    >
      {checked && <Check size={16} className="text-black" />}
    </span>
  );
}
