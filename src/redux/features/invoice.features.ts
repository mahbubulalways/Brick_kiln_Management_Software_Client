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

    // GET ITEMS WITH INVOICE
    getItemsWithInvoices: builder.query({
      query: (date: { startDate: string; endDate: string }) => ({
        url: `/invoice/items?startDate=${date.startDate}&endDate=${date.endDate}`,
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),

    // GET SINGLE INVOICE
    getSingleInvoice: builder.query({
      query: (id: number) => ({
        url: `/invoice/single-invoice/${id}`,
        method: "GET",
      }),
    }),
    // GET SINGLE INVOICE ITEMS
    getSingleInvoiceItems: builder.query({
      query: (payload: { invoiceId: number; ids: string }) => ({
        url: `/invoice/single-invoice-items/${payload?.invoiceId}?ids=${payload?.ids}`,
        method: "GET",
      }),
      providesTags: ["InvoiceItem"],
    }),

    // UPDATE INVOICE
    updateInvoice: builder.mutation({
      query: (payload) => ({
        url: `/invoice/update-invoice/${payload.id}`,
        method: "PATCH",
        body: payload.payload,
      }),
      invalidatesTags: ["Invoice"],
    }),

    // UPDATE INVOICE DELIVERY DATE
    updateInvoiceDeliveryDate: builder.mutation({
      query: (payload) => ({
        url: `/invoice/update-invoice-delivery-date/${payload.id}`,
        method: "PATCH",
        body: payload.payload,
      }),
      invalidatesTags: ["Invoice"],
    }),
    // UPDATE INVOICE ITEM DELIVERY DAE
    updateInvoiceItemDeliveryDate: builder.mutation({
      query: (payload) => ({
        url: `/invoice/update-item-delivery-date/${payload.id}`,
        method: "PATCH",
        body: payload.payload,
      }),
      invalidatesTags: ["InvoiceItem"],
    }),

    //  DELETE INVOICE
    deleteInvoice: builder.mutation({
      query: (id: number) => ({
        url: `/invoice/delete-invoice/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceSerialQuery,
  useGetAllInvoicesQuery,
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetItemsWithInvoicesQuery,
  useGetSingleInvoiceItemsQuery,
  useUpdateInvoiceDeliveryDateMutation,
  useUpdateInvoiceItemDeliveryDateMutation,
  useLazyGetSingleInvoiceQuery,
} = invoiceApi;
