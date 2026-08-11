import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const unloadApi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        // // GET ALL LOAD INFO
        getAllUnloadInfo: builder.query({
            query: (query:TQuery) => ({
                url: "/unload/all",
                method: "GET",
                // params: {
                //     page: query.page,
                //     limit: query.limit,
                //     search: query.search,
                //     date: query.date,
                // },
            }),
            providesTags: ["UNLOAD"],
        }),

        // GET SINGLE LOAD INFO
        // getSingleLoadInfo: builder.query({
        //     query: (id) => ({
        //         url: `/load-info/single/${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["LOAD_INFO"],
        // }),

        // CREATE UNLOAD INFO
        createUnloadInfo: builder.mutation({
            query: (payload) => ({
                url: "/unload/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["UNLOAD"],
        }),

        // UPDATE LOAD INFO
        // updateLoadInfo: builder.mutation({
        //     query: (payload) => ({
        //         url: `/load-info/update/${payload.id}`,
        //         method: "PATCH",
        //         body: payload.data,
        //     }),
        //     invalidatesTags: ["LOAD_INFO"],
        // }),

        // // DELETE LOAD INFO
        // deleteLoadInfo: builder.mutation({
        //     query: (id) => ({
        //         url: `/load-info/delete/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["LOAD_INFO"],
        // }),
    }),
});

export const {
useCreateUnloadInfoMutation,
useGetAllUnloadInfoQuery
} = unloadApi;