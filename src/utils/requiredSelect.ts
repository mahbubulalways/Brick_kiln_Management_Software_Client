"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions } from "react-hook-form";

export const requiredSelect = (
  rules?: RegisterOptions,
): RegisterOptions | undefined => {
  if (!rules?.required) return rules;

  const message =
    typeof rules.required === "string"
      ? rules.required
      : "This field is required";

  return {
    ...rules,
    required: undefined,
    validate: (value: any) =>
      value !== undefined && value !== null ? true : message,
  };
};
