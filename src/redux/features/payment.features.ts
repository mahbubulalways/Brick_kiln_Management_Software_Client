import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE NEW PAYMENT
    createPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PAYMENT"],
    }),

    // GET LEDGER COUNT
    getPayment: builder.query({
      query: (query: TQuery) => ({
        url: `/payment/all?page=${query.page}&limit=${query.limit}&search=${query.search}&date=${query.date}`,
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),

    getPaymentReport: builder.query({
      query: (date: string) => ({
        url: `/payment/report/date=${date}`,
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),

    // // GET ALL LEDGER
    // getAllLedger: builder.query({
    //   query: () => ({
    //     url: `/ledger/all`,
    //     method: "GET",
    //   }),
    //   providesTags: ["LEDGER"],
    // }),

    // // GET LEDGER OPTION
    // getLedgerOption: builder.query({
    //   query: () => ({
    //     url: `/ledger/options`,
    //     method: "GET",
    //   }),
    //   providesTags: ["LEDGER"],
    // }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentQuery,
  useGetPaymentReportQuery,
} = paymentApi;
