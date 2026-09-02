import { TQuery } from "@/interface/query";
import { baseApi } from "../baseApi";

const goodStockApi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        // GET ALL 
        getAllGoodsStock: builder.query({
            query: () => ({
                url: `/goods/all`,
                method: "GET",
            }),
            providesTags: ["GOODS"],
        }),

        
        // CREATE 
        createNewGoodStock: builder.mutation({
            query: (payload) => ({
                url: "/goods/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["GOODS"],
        }),


        // GET ALL 
        getGoodsStockOptions: builder.query({
            query: () => ({
                url: `/goods/options`,
                method: "GET",
            }),
            providesTags: ["GOODS"],
        }),




        getGoodsCategoryOptions: builder.query({
            query: () => ({
                url: `/goods-category/options`,
                method: "GET",
            }),
            providesTags: ["GOODS"],
        }),

        // GET SINGLE 
        getSingleGoodsCategory: builder.query({
            query: (id) => ({
                url: `/goods-category/single/${id}`,
                method: "GET",
            }),
            providesTags: ["GOODS"],
        }),

        // UPDATE 
        updateGoodsCategory: builder.mutation({
            query: (payload) => ({
                url: `/goods-category/update/${payload.id}`,
                method: "PATCH",
                body: payload.data,
            }),
            invalidatesTags: ["GOODS"],
        }),

        // DELETE 
        deleteGoodsCategory: builder.mutation({
            query: (id) => ({
                url: `/goods-category/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["GOODS"],
        }),
    }),
});

export const {
useCreateNewGoodStockMutation,
useGetAllGoodsStockQuery,
useGetGoodsStockOptionsQuery
} = goodStockApi;