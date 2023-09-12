import { emptySplitApi } from "../../Services";
export const Notifications = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: `profile/admin-dashboard`,
        method: "GET",
      }),
    }),
    postNotifications: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["products"],
      }),
  }),
});

export const { usePostNotificationsMutation ,useGetAllNotificationsQuery} = Notifications;
