/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldError, Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TCustomSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  required?: boolean;
  control: Control<any>;
  error?: FieldError;
  disabled?: boolean;
  defaultValue?: string;
};
const CustomSelect = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  required,
  control,
  error,
  disabled,
  defaultValue,
}: TCustomSelectProps) => {
  return (
    <div className="flex-1 w-full min-w-[200px]">
      <label className="pb-1 lg:pb-0.5 flex items-center text-sm font-medium text-gray-600">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger
              className="w-full rounded border border-gray-300 cursor-pointer flex items-center px-2"
              style={{
                height: "32px",
                minHeight: "0",
                paddingTop: "0px",
                paddingBottom: "0px",
                lineHeight: "1",
              }}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options?.map((option) => (
                <SelectItem
                  className="cursor-pointer"
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && (
        <p className="text-[14px] text-red-500 pt-2">{error.message}</p>
      )}
    </div>
  );
};

export default CustomSelect;
