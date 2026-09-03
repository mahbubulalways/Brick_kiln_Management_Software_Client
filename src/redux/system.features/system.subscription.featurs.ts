import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const systemSubscriptionApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        // CREATE SUBSCRIPTION
        createSubscription: builder.mutation({
            query: (payload) => ({
                url: "/system/subscription/create",
                method: "POST",
                body: payload,
            }),
        }),

        // GET ALL SUBSCRIPTION
        getAllSubscription: builder.query({
            query: () => ({
                url: "/system/subscription/all",
            }),
        }),

        // GET  SUBSCRIPTION OPTIONS
        getSubscriptionOptions: builder.query({
            query: () => ({
                url: "/system/subscription/options",
            }),
        }),
        
      

       

    }),
});

export const {
useCreateSubscriptionMutation,
useGetAllSubscriptionQuery,
useGetSubscriptionOptionsQuery
} = systemSubscriptionApi;