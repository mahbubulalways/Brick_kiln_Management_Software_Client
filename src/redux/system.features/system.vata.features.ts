import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const systemVataApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        // CREATE VATA
        createNewVata: builder.mutation({
            query: (payload) => ({
                url: "/system/vata/create",
                method: "POST",
                body: payload,
            }),
        }),

        // GET ALL VATA
        getAllVata: builder.query({
            query: () => ({
                url: "/system/vata/all",
            }),
        }),
        
        // GET ALL VATA
        getInactiveVata: builder.query({
            query: () => ({
                url: "/system/vata/inactive",
            }),
        }),

        // GET SINGLE VATA
        getSingleVata: builder.query({
            query: (id: string) => ({
                url: `/system/vata/single/${id}`,
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

    }),
});

export const {
    useCreateNewVataMutation,
    useVerifySubDomainMutation,
    useGetAllVataQuery,
    useGetSingleVataQuery,
    useGetInactiveVataQuery
} = systemVataApi;