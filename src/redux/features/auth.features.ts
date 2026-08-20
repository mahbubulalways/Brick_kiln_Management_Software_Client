import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
        logoutFromTheSystem: builder.mutation({
            query: (payload) => ({
                url: `/auth/logout`,
                method: "POST",
                body:payload.info
            }),
        }),
    }),
});

export const {
useLogoutFromTheSystemMutation
} = authApi;