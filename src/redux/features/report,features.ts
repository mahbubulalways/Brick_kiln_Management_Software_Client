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

        // DASHBOARD REPORT
        dashboardReport: builder.query({
            query: () => ({
                url: "report/dashboard",
              
            }),
        }),

    }),
});

export const { useGetSellReportQuery,useDashboardReportQuery } = reportAPi;