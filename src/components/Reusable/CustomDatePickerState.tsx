"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TPickMode = "date" | "month" | "year";

type TCustomDatePickerStateProps = {
  label?: string;
  placeholder?: string;
  value: Date | undefined;
  onChange: Dispatch<SetStateAction<Date | undefined>>;
  mode?: TPickMode;
  disablePastDates?: boolean;
  maxFutureDays?: number;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  height?: string;
};

type TCalendarView = "date" | "month" | "year";

const CustomDatePickerState = ({
  label,
  placeholder,
  value,
  onChange,
  mode = "date",
  disablePastDates = false,
  maxFutureDays,
  minDate,
  maxDate,
  error,
  height = "10",
}: TCustomDatePickerStateProps) => {
  const [calendarView, setCalendarView] = useState<TCalendarView>(mode);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const resolvedMinDate = disablePastDates ? today : minDate;

  const resolvedMaxDate =
    maxFutureDays !== undefined
      ? new Date(today.getTime() + maxFutureDays * 24 * 60 * 60 * 1000)
      : maxDate;

  const getDateFormat = () => {
    if (calendarView === "year") {
      return "yyyy";
    }

    if (calendarView === "month") {
      return "MM-yyyy";
    }

    return "dd-MM-yyyy";
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;

    if (calendarView === "year") {
      return "Select a year";
    }

    if (calendarView === "month") {
      return "Select a month";
    }

    return "Select a date";
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      onChange(undefined);
      return;
    }

    onChange(date);

    // Month select করার পর আবার date view
    if (calendarView === "month") {
      setCalendarView("date");
    }

    // Year select করার পর month view
    if (calendarView === "year") {
      setCalendarView("month");
    }
  };

  return (
    <div className="w-full lg:w-auto">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="custom-date-picker-wrapper relative w-full max-w-[250px]">
        <div
          className={`relative flex h-${height} w-full items-center rounded-lg border px-4 py-2 transition-colors ${
            error
              ? "border-2 border-red-500"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-[#00664A]"
          }`}
        >
          <DatePicker
            selected={value}
            onChange={handleDateChange}
            placeholderText={getPlaceholder()}
            minDate={resolvedMinDate}
            maxDate={resolvedMaxDate}
            dateFormat={getDateFormat()}
            showMonthYearPicker={calendarView === "month"}
            showYearPicker={calendarView === "year"}
            className="w-full cursor-pointer bg-transparent pr-6 text-sm outline-none"
            popperPlacement="bottom-start"
            calendarClassName="custom-datepicker-calendar"
            onKeyDown={(e) => e.preventDefault()}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
              changeMonth,
              changeYear,
            }) => {
              const currentYear = date.getFullYear();
              const currentMonth = date.getMonth();

              const monthName = date.toLocaleString("en-US", {
                month: "short",
              });

              /*
               * Single arrow:
               * Previous / Next month
               */
              const handlePreviousMonth = () => {
                if (calendarView === "year") {
                  changeYear(currentYear - 1);
                  return;
                }

                if (calendarView === "month") {
                  changeYear(currentYear - 1);
                  return;
                }

                decreaseMonth();
              };

              const handleNextMonth = () => {
                if (calendarView === "year") {
                  changeYear(currentYear + 1);
                  return;
                }

                if (calendarView === "month") {
                  changeYear(currentYear + 1);
                  return;
                }

                increaseMonth();
              };

              /*
               * Double arrow:
               * Previous / Next year
               */
              const handlePreviousYear = () => {
                changeYear(currentYear - 1);
              };

              const handleNextYear = () => {
                changeYear(currentYear + 1);
              };

              return (
                <div className="custom-calendar-header">
                  {/* LEFT ARROWS */}
                  <div className="calendar-nav-left">
                    {/* Previous Year */}
                    <button
                      type="button"
                      onClick={handlePreviousYear}
                      className="calendar-nav-button"
                      aria-label="Previous year"
                    >
                      <ChevronLeft size={15} />
                      <ChevronLeft size={15} className="-ml-2" />
                    </button>

                    {/* Previous Month */}
                    <button
                      type="button"
                      onClick={handlePreviousMonth}
                      disabled={
                        calendarView === "date" && prevMonthButtonDisabled
                      }
                      className="calendar-nav-button"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={17} />
                    </button>
                  </div>

                  {/* TITLE */}
                  <div className="calendar-title">
                    {/* Month */}
                    {calendarView === "date" ? (
                      <button
                        type="button"
                        onClick={() => setCalendarView("month")}
                        className="calendar-title-button"
                      >
                        {monthName}
                      </button>
                    ) : calendarView === "month" ? (
                      <span className="calendar-title-text">{currentYear}</span>
                    ) : (
                      <span className="calendar-title-text">{currentYear}</span>
                    )}

                    {/* Year */}
                    {calendarView === "date" && (
                      <button
                        type="button"
                        onClick={() => setCalendarView("year")}
                        className="calendar-title-button"
                      >
                        {currentYear}
                      </button>
                    )}

                    {calendarView === "month" && (
                      <button
                        type="button"
                        onClick={() => setCalendarView("year")}
                        className="calendar-title-button"
                      >
                        {currentYear}
                      </button>
                    )}
                  </div>

                  {/* RIGHT ARROWS */}
                  <div className="calendar-nav-right">
                    {/* Next Month */}
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      disabled={
                        calendarView === "date" && nextMonthButtonDisabled
                      }
                      className="calendar-nav-button"
                      aria-label="Next month"
                    >
                      <ChevronRight size={17} />
                    </button>

                    {/* Next Year */}
                    <button
                      type="button"
                      onClick={handleNextYear}
                      className="calendar-nav-button"
                      aria-label="Next year"
                    >
                      <ChevronRight size={15} />
                      <ChevronRight size={15} className="-ml-2" />
                    </button>
                  </div>
                </div>
              );
            }}
          />

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Calendar size={18} />
          </div>
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default CustomDatePickerState;
