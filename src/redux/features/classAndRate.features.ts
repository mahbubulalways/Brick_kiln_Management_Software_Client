import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // POST A CLASS AND RATE
    createClassAndRate: builder.mutation({
      query: (payload) => ({
        url: "/class/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ClassAndRate"],
    }),

    // GET ALL CLASS AND RATE
    getAllClassAndRate: builder.query({
      query: () => ({
        url: "/class/class-and-rate",
        method: "GET",
      }),
      providesTags: ["ClassAndRate"],
    }),

    // GET SINGLE CLASS AND RATE
    getSingleClassAndRate: builder.query({
      query: (id: number) => ({
        url: `/class/class-and-rate/${id}`,
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
  useCreateClassAndRateMutation,
  useGetAllClassAndRateQuery,
  useGetSingleClassAndRateQuery,
  useUpdateClassAndRateMutation,
} = authApi;
