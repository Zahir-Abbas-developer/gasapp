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
    getOverAllProducts: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/orders?status=PENDING`,
          method: "GET",
        }),
  
        providesTags: ["orders"],
      }),
  }),
});

export const {
 usePostOrdersMutation, 
} = extendedApi;
