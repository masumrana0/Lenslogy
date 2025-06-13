import { baseApi } from "./baseApi";

const url = "/gadget/brand";

const bandApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Create a new Band
    createBand: build.mutation({
      query: (data: { name: string }) => ({
        url: `${url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    updateBand: build.mutation({
      query: ({ name, id }: { id: string; name: string }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        body: { name: name },
      }),
      invalidatesTags: ["brand"],
    }),

    // Delete a Band
    deleteBand: build.mutation({
      query: (baseId: string) => ({
        url: `${url}?baseId=${baseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),

    getAllBrand: build.query({
      query: (lang?: string) => ({
        url: `${url}`,
        method: "GET",
        params: lang ? { lang } : "en",
      }),
      providesTags: ["brand"],
    }),

    getBandById: build.query({
      query: ({ id, lang }: { id: string; lang?: "en" | "bn" }) => ({
        url: `${url}/${id}`,
        method: "GET",
        params: lang ? { lang } : "en",
      }),
      providesTags: ["brand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBandMutation,
  useUpdateBandMutation,
  useDeleteBandMutation,
  useGetBandByIdQuery,
  useGetAllBrandQuery,
} = bandApi;
