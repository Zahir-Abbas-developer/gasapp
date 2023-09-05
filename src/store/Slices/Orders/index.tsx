import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    postOrders: builder.query({
      query: ({payload}:any) => ({
        url: `orders`,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["orders"],
    }),
  
  }),
});

export const {
 usePostOrdersMutation, 
} = extendedApi;
