import { baseApi } from "../baseApi";

const dueCollectionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // POST A NEW DUE
    collectionDue: builder.mutation({
      query: (payload) => ({
        url: "/due/collection",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["DueCollection"],
    }),

    // GET SINGLE CUSTOMERS DUE
    getCustomerDue: builder.query({
      query: (id: number) => ({
        url: `/due/customer-due/${id}`,
        method: "GET",
      }),
      //   providesTags: ["ClassAndRate"],
    }),

    // GET TODAY HAVE DUE
    getTodayHaveDue: builder.query({
      query: (date: string) => ({
        url: `/due/today-have-due?date=${date}`,
        method: "GET",
      }),
    }),

    // GET TODAY PAID
    getTodayPaid: builder.query({
      query: (date: string) => ({
        url: `/due/today-paid?date=${date}`,
        method: "GET",
      }),
      providesTags: ["DueCollection"],
    }),

    // GET ALL DUES
    getAllDueList: builder.query({
      query: (date: { startDate: string; endDate: string }) => ({
        url: `/due/all-due?startDate=${date.startDate}&endDate=${date.endDate}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    // GET ALL DUES
    getSingleDue: builder.query({
      query: (id) => ({
        url: `/due/get-single/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    // UPDATE DUE COLLECTION
    updateDueCollection: builder.mutation({
      query: (payload) => ({
        url: `/due/update/${payload.id}`,
        method: "PATCH",
        body: payload.payload,
      }),
      invalidatesTags: ["DueCollection"],
    }),
  }),
});

export const {
  useCollectionDueMutation,
  useGetCustomerDueQuery,
  useGetTodayHaveDueQuery,
  useGetTodayPaidQuery,
  useGetAllDueListQuery,
  useGetSingleDueQuery,
  useUpdateDueCollectionMutation,
} = dueCollectionApi;
