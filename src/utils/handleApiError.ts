import { showToast } from "@/components/Toast/CustomToast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


type HandleApiErrorOptions = {
  error: unknown;
  notFoundMessage?: string;
  defaultMessage?: string;
};

export const handleApiError = ({
  error,
  notFoundMessage = "তথ্য পাওয়া যায়নি",
  defaultMessage = "তথ্য লোড করতে সমস্যা হয়েছে",
}: HandleApiErrorOptions) => {
  const apiError = error as FetchBaseQueryError;

  // Internet / Server connection error
  if (apiError?.status === "FETCH_ERROR") {
    showToast({
      title: navigator.onLine
        ? "সার্ভারের সাথে সংযোগ করা যাচ্ছে না"
        : "ইন্টারনেট সংযোগ নেই",
      type: "error",
    });

    return;
  }

  // Not Found
  if (apiError?.status === 404) {
    showToast({
      title: notFoundMessage,
      type: "error",
    });

    return;
  }

  // Other errors
  showToast({
    title: defaultMessage,
    type: "error",
  });
};