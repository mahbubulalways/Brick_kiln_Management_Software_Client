// import { getToken } from "@/service/auth.services";
import { getToken } from "@/service/auth.services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API as string,
    credentials: "include",

    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "ClassAndRate",
    "Invoice",
    "InvoiceItem",
    "Delivery",
    "DueCollection",
    "LEDGER",
    "PAYMENT",
    "CASH",
    "LOAD_INFO",
    "ROUND",
    "UNLOAD",
    "CUSTOMER",
    "DOCUMENT",
    "CAR_RENT",
    "USER",
    "TASK",
    "DUE_MATE",
    "CONTACT"
  ],
  endpoints: () => ({}),
});
