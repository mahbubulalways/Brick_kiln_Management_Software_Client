import { baseApi } from "../baseApi";

const cashApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // GET ALL CASH
    getAllCash: builder.query({
      query: (query) => ({
        url: `/cash`,
        method: "GET",
        params: query,
      }),
      providesTags: ["CASH"],
    }),

    // GET SINGLE CASH
    getSingleCash: builder.query({
      query: (id) => ({
        url: `/cash/single/${id}`,
        method: "GET",
      }),
      providesTags: ["CASH"],
    }),

    // CREATE NEW CASH
    createCash: builder.mutation({
      query: (payload) => ({
        url: "/cash/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CASH"],
    }),

    // UPDATE CASH
    updateCash: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/cash/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["CASH"],
    }),

    // DELETE CASH
    deleteCash: builder.mutation({
      query: (id) => ({
        url: `/cash/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CASH"],
    }),
  }),
});

export const {
  useGetAllCashQuery,
  useGetSingleCashQuery,
  useCreateCashMutation,
  useUpdateCashMutation,
  useDeleteCashMutation,
} = cashApi;