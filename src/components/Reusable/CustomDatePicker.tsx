/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";

type TPickMode = "date" | "month" | "year";

type TCustomDatePicker = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  error?: FieldError;
  mode?: TPickMode;
  disablePastDates?: boolean;
  maxFutureDays?: number;
  minDate?: Date;
  maxDate?: Date;
  border?: boolean;
};

const CustomDatePicker = ({
  name,
  control,
  label,
  placeholder,
  rules,
  error,
  mode = "date",
  disablePastDates = false,
  maxFutureDays,
  minDate,
  maxDate,
  border = true,
}: TCustomDatePicker) => {
  const [focused, setFocused] = useState(false);

  const modeConfig: Record<
    TPickMode,
    { dateFormat: string; placeholder: string }
  > = {
    date: { dateFormat: "dd-MM-yyyy", placeholder: "Select a date" },
    month: { dateFormat: "MM-yyyy", placeholder: "Select a month" },
    year: { dateFormat: "yyyy", placeholder: "Select a year" },
  };

  // today er start (time 00:00:00) - past date compare korar jonno
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const resolvedMinDate = disablePastDates ? today : minDate;

  const resolvedMaxDate =
    maxFutureDays !== undefined
      ? new Date(today.getTime() + maxFutureDays * 24 * 60 * 60 * 1000)
      : maxDate;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block font-medium text-gray-700">
          {label}
          {rules && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div className="custom-date-picker-wrapper relative w-full">
            <div
              className={`h-9 relative flex w-full items-center rounded-lg ${border ? "border px-4 py-2 outline-none" : ""} transition-colors ${
                error
                  ? "border-2 border-red-500"
                  : `${border ? "border-gray-300 focus-within:ring-2 focus-within:ring-[#00664A] duration-500" : ""}`
              }`}
            >
              <DatePicker
                placeholderText={placeholder || modeConfig[mode].placeholder}
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                onCalendarOpen={() => setFocused(true)}
                onCalendarClose={() => {
                  setFocused(false);
                  field.onBlur();
                }}
                minDate={resolvedMinDate}
                maxDate={resolvedMaxDate}
                dateFormat={modeConfig[mode].dateFormat}
                showYearPicker={mode === "year"}
                showMonthYearPicker={mode === "month"}
                className="w-full cursor-pointer bg-transparent pr-6 text-sm text-black outline-none placeholder:text-[16px] placeholder:text-black/50"
                calendarClassName="custom-datepicker-calendar"
                popperPlacement="bottom-start"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
              {/* Calendar Icon Right Side */}
              {border ? (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomDatePicker;
