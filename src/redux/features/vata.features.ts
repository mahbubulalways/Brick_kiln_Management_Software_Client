import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const vataApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // CREATE VATA
        createNewVata: builder.mutation({
            query: (payload) => ({
                url: "/vata/create",
                method: "POST",
                body: payload,
            }),
        }),

        // DOMAIN
        verifySubDomain: builder.mutation({
            query: (payload) => ({
                url: "/vata/verify-domain",
                method: "POST",
                body: payload,
            }),
        }),

        // GET VATA INFO
         getVataInfo: builder.query({
            query: () => ({
                url: `/vata/info`,
            }),
        }),
        
        // GET VATA INFO
         getMyVataInformation: builder.query({
            query: () => ({
                url: `/vata/me`,
            }),
        }),

    }),
});

export const {
    useCreateNewVataMutation,
    useVerifySubDomainMutation,
    useGetVataInfoQuery,
    useGetMyVataInformationQuery
} = vataApi;