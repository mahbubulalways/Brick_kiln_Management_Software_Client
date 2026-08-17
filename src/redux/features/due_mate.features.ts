import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const dueMateApi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        // GET ALL RECEIVABLE & PAYABLE
        getAllDueMate: builder.query({
            query: (query: TQuery) => ({
                url: `/due-mate/all?page=${query.page}&limit=${query.limit}`,
                method: "GET",
            }),
            providesTags: ["DUE_MATE"],
        }),

        // GET SINGLE DUE
        getSingleDue: builder.query({
            query: (id) => ({
                url: `/receivable-payable/single/${id}`,
                method: "GET",
            }),
            providesTags: ["DUE_MATE"],
        }),

        // GET DUE OPTIONS
        getDueOptions: builder.query({
            query: () => ({
                url: "/receivable-payable/options",
                method: "GET",
            }),
        }),

        // CREATE RECEIVABLE / PAYABLE
        createDue: builder.mutation({
            query: (payload) => ({
                url: "/due-mate/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["DUE_MATE"],
        }),

        // UPDATE DUE
        updateDue: builder.mutation({
            query: (payload) => ({
                url: `/receivable-payable/update/${payload.id}`,
                method: "PATCH",
                body: payload.data,
            }),
            invalidatesTags: ["DUE_MATE"],
        }),

        // DELETE DUE
        deleteDue: builder.mutation({
            query: (id) => ({
                url: `/receivable-payable/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DUE_MATE"],
        }),
    }),
});

export const {
    useGetAllDueMateQuery,
    useGetSingleDueQuery,
    useGetDueOptionsQuery,
    useCreateDueMutation,
    useUpdateDueMutation,
    useDeleteDueMutation,
} = dueMateApi;



//   // TAKEN
//         getAllTakenDue: builder.query({
//             query: (query: TQuery) => ({
//                 url: `/receivable-payable/all?page=${query.page}&limit=${query.limit}`,
//                 method: "GET",
//             }),
//             providesTags: ["DUE_MATE"],
//         }),
