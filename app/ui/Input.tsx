"use client";
import { InputHTMLAttributes, useState } from "react";

type Props = {
  className?: string;
  regexp?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  regexp,
  onChange,
  ...rest
}: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const regex = regexp ? new RegExp(regexp) : null;

    if (!regex || regex.test(val) || val === "") {
      setValue(val);
      onChange?.(e); // пробрасываем наружу
    }
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      className={`font-semibold outline-none text-lg !border rounded-xl !border-white/20 placeholder:opacity-50 !text-[16px] bg-black/10 !transition-colors px-3 py-2 ${className}`}
      {...rest}
    />
  );
}
