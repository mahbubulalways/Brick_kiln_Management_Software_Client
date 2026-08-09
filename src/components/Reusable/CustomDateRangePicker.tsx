"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TCustomDateRangePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disablePastDates?: boolean;
  maxFutureDays?: number;
  minDate?: Date;
  maxDate?: Date;
  border?: boolean;
};

const CustomDateRangePicker = ({
  value = "",
  onChange,
  placeholder = "শুরু তারিখ → শেষ তারিখ",
  label,
  disablePastDates = false,
  maxFutureDays,
  minDate,
  maxDate,
  border = true,
}: TCustomDateRangePickerProps) => {
  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date: Date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0");

    const day = String(
      date.getDate(),
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // PARSE DATE
  // ==========================================
  const parseDate = (date?: string) => {
    if (!date) return null;

    const [year, month, day] = date
      .split("-")
      .map(Number);

    if (!year || !month || !day) {
      return null;
    }

    const result = new Date(
      year,
      month - 1,
      day,
    );

    return isNaN(result.getTime())
      ? null
      : result;
  };

  // ==========================================
  // GET START & END DATE
  // ==========================================
  const [startValue, endValue] =
    value.split("_");

  const startDate = parseDate(startValue);
  const endDate = parseDate(endValue);

  // ==========================================
  // TODAY
  // ==========================================
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // ==========================================
  // MIN DATE
  // ==========================================
  const resolvedMinDate = disablePastDates
    ? today
    : minDate;

  // ==========================================
  // MAX DATE
  // ==========================================
  const resolvedMaxDate =
    maxFutureDays !== undefined
      ? new Date(
          today.getTime() +
            maxFutureDays *
              24 *
              60 *
              60 *
              1000,
        )
      : maxDate;

  return (
    <div className="w-full">
      {/* ======================================
          LABEL
      ====================================== */}
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* ======================================
          DATE RANGE PICKER
      ====================================== */}
      <div
        className={`custom-date-picker-wrapper relative flex h-9 w-full items-center rounded-lg transition-colors ${
          border
            ? "border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-[#00664A]"
            : ""
        }`}
      >
        <DatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          shouldCloseOnSelect={false}
          onChange={(dates) => {
            const [start, end] = dates;

            // Nothing selected
            if (!start) {
              onChange?.("");
              return;
            }

            // Start date
            const formattedStart =
              formatDate(start);

            // Only start date selected
            if (!end) {
              onChange?.(
                `${formattedStart}_`,
              );
              return;
            }

            // End date
            const formattedEnd =
              formatDate(end);

            // Final value:
            // 2026-08-01_2026-08-10
            onChange?.(
              `${formattedStart}_${formattedEnd}`,
            );
          }}
          placeholderText={placeholder}
          minDate={resolvedMinDate}
          maxDate={resolvedMaxDate}
          dateFormat="dd-MM-yyyy"
          className="w-full cursor-pointer bg-transparent pr-7 text-sm text-black outline-none placeholder:text-[16px] placeholder:text-black/50"
          calendarClassName="custom-datepicker-calendar"
          popperPlacement="bottom-start"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            changeYear,
          }) => {
            const currentYear =
              date.getFullYear();

            const monthName =
              date.toLocaleString(
                "en-US",
                {
                  month: "short",
                },
              );

            // ==================================
            // PREVIOUS YEAR
            // ==================================
            const handlePreviousYear =
              () => {
                changeYear(
                  currentYear - 1,
                );
              };

            // ==================================
            // NEXT YEAR
            // ==================================
            const handleNextYear = () => {
              changeYear(
                currentYear + 1,
              );
            };

            return (
              <div className="custom-calendar-header flex items-center justify-between px-2 py-2">
                {/* ==============================
                    LEFT NAVIGATION
                ============================== */}
                <div className="calendar-nav-left flex items-center gap-1">
                  {/* Previous Year */}
                  <button
                    type="button"
                    onClick={
                      handlePreviousYear
                    }
                    className="calendar-nav-button flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100"
                    aria-label="Previous year"
                  >
                    <ChevronLeft
                      size={15}
                    />

                    <ChevronLeft
                      size={15}
                      className="-ml-2"
                    />
                  </button>

                  {/* Previous Month */}
                  <button
                    type="button"
                    onClick={
                      decreaseMonth
                    }
                    disabled={
                      prevMonthButtonDisabled
                    }
                    className="calendar-nav-button flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous month"
                  >
                    <ChevronLeft
                      size={17}
                    />
                  </button>
                </div>

                {/* ==============================
                    TITLE
                ============================== */}
                <div className="calendar-title flex items-center gap-1">
                  <span className="calendar-title-text text-sm font-medium">
                    {monthName}
                  </span>

                  <span className="calendar-title-text text-sm font-medium">
                    {currentYear}
                  </span>
                </div>

                {/* ==============================
                    RIGHT NAVIGATION
                ============================== */}
                <div className="calendar-nav-right flex items-center gap-1">
                  {/* Next Month */}
                  <button
                    type="button"
                    onClick={
                      increaseMonth
                    }
                    disabled={
                      nextMonthButtonDisabled
                    }
                    className="calendar-nav-button flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next month"
                  >
                    <ChevronRight
                      size={17}
                    />
                  </button>

                  {/* Next Year */}
                  <button
                    type="button"
                    onClick={
                      handleNextYear
                    }
                    className="calendar-nav-button flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100"
                    aria-label="Next year"
                  >
                    <ChevronRight
                      size={15}
                    />

                    <ChevronRight
                      size={15}
                      className="-ml-2"
                    />
                  </button>
                </div>
              </div>
            );
          }}
        />

        {/* ======================================
            CALENDAR ICON
        ====================================== */}
        {border && (
          <Calendar
            size={18}
            className="pointer-events-none absolute right-3 text-gray-400"
          />
        )}
      </div>
    </div>
  );
};

export default CustomDateRangePicker;