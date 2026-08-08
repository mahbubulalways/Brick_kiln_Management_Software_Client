import { baseApi } from "../baseApi";

const ledgerAPi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET LEDGER COUNT
    getLedgerCount: builder.query({
      query: () => ({
        url: `/ledger/count`,
        method: "GET",
      }),
      providesTags: ["LEDGER"],
    }),

    // GET ALL LEDGER
    getAllLedger: builder.query({
      query: () => ({
        url: `/ledger/all`,
        method: "GET",
      }),
      providesTags: ["LEDGER"],
    }),

    // GET LEDGER OPTION
    getLedgerOption: builder.query({
      query: () => ({
        url: `/ledger/options`,
        method: "GET",
      }),
      providesTags: ["LEDGER"],
    }),

    // CREATE NEW LEDGER
    createLedger: builder.mutation({
      query: (payload) => ({
        url: "/ledger/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LEDGER"],
    }),
  }),
});

export const {
  useGetLedgerCountQuery,
  useCreateLedgerMutation,
  useGetLedgerOptionQuery,
  useGetAllLedgerQuery,
} = ledgerAPi;
