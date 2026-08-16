import { baseApi } from "../baseApi";

const reportAPi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        //   GET SELL REPORT
        getSellReport: builder.query({
            query: () => ({
                url: "report/area",
              
            }),
        }),

    }),
});

export const { useGetSellReportQuery } = reportAPi;