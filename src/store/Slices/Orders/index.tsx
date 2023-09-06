import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    postOrders: builder.mutation({
      query: ({payload}:any) => ({
        url: `orders`,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["orders"],
    }),
    getOverAllOrders: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/orders?status=PENDING`,
          method: "GET",
        }),
  
        providesTags: ["orders"],
      }),
      cancelOrder: builder.mutation({
        query: ({id,payload}:any) => ({
          url: `orders/${id}`,
          method: "PATCH",
          body: payload,
        }),
  
        invalidatesTags: ["orders"],
      }),
  }),
});

export const {
 usePostOrdersMutation, 
 useCancelOrderMutation,
 useGetOverAllOrdersQuery
} = extendedApi;
