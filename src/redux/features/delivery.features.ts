import { baseApi } from "../baseApi";

const deliveryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET ALL CLASS AND RATE
    getNextDeliveryNo: builder.query({
      query: () => ({
        url: `/delivery/next-delivery-no`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getTodaysDelivery: builder.query({
      query: (date) => ({
        url: `/delivery/todays-delivery?date=${date}`,
        method: "GET",
      }),
      providesTags: ["Delivery"],
      keepUnusedDataFor: 0,
    }),

    getAllDeliveryList: builder.query({
      query: (date: { startDate: string; endDate: string }) => ({
        url: `/delivery/delivery-list?startDate=${date.startDate}&endDate=${date.endDate}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getDeliveryHaveToday: builder.query({
      query: (date) => ({
        url: `/delivery/today-have-delivery?date=${date}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    // GET SINGLE
    getSingleDelivery: builder.query({
      query: (id) => ({
        url: `/delivery/single-delivery/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    // CREATE NEW DELIVERY
    createDelivery: builder.mutation({
      query: (payload) => ({
        url: "/delivery/create-delivery",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Delivery"],
    }),
  }),
});

export const {
  useGetTodaysDeliveryQuery,
  useGetNextDeliveryNoQuery,
  useCreateDeliveryMutation,
  useGetDeliveryHaveTodayQuery,
  useGetAllDeliveryListQuery,
  useGetSingleDeliveryQuery,
} = deliveryApi;
