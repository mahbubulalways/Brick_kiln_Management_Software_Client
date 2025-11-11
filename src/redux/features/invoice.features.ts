import { baseApi } from "../baseApi";

const invoiceApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET INVOICE SERIAL
    getInvoiceSerial: builder.query({
      query: () => ({
        url: "/invoice/serial",
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),
    // POST INVOICE
    createInvoice: builder.mutation({
      query: (payload) => ({
        url: "/invoice/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Invoice"],
    }),

    // GET ALL INVOICE
    getAllInvoices: builder.query({
      query: () => ({
        url: "/invoice/all-invoices",
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),

    // GET SINGLE CLASS AND RATE
    getSingleInvoice: builder.query({
      query: (id: number) => ({
        url: `/invoice/single-invoice/${id}`,
        method: "GET",
      }),
    }),

    // UPDATE CLASS AND RATE
    updateClassAndRate: builder.mutation({
      query: (payload) => ({
        url: `/class/update-class-and-rate/${payload.id}`,
        method: "PATCH",
        body: payload.payload,
      }),
      invalidatesTags: ["ClassAndRate"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceSerialQuery,
  useGetAllInvoicesQuery,
  useGetSingleInvoiceQuery,
} = invoiceApi;
