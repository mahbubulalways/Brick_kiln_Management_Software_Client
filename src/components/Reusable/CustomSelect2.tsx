"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TCustomSelect2Props = {
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

const CustomSelect2: React.FC<TCustomSelect2Props> = ({
  options,
  placeholder = "Select an option",
  defaultValue,
  disabled = false,
  className = "",
  onChange,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(value) => onChange && onChange(value)}
    >
      <SelectTrigger
        className={`w-full max-w-40 border border-gray-300  px-2 rounded-md cursor-pointer  ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option} className="cursor-pointer">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect2;
