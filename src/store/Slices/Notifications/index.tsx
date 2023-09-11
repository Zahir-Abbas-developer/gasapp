import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getOverAllNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    postNotifications: builder.query({
      query: ({ payload }: any) => ({
        url: `/notifications'`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["notifications"],
    }),
  
  }),
});

export const {
 useGetOverAllNotificationsQuery,usePostNotificationsMutation
} = extendedApi;
