import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getOverAllNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
    }),
  
  }),
});

export const {
 useGetOverAllNotificationsQuery
} = extendedApi;
