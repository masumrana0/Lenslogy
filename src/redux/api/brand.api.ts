 
import { baseApi } from "./baseApi";

const url = "/gadget/brand";

const BandApi: any = baseApi.injectEndpoints({
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

    // Upcrea ed t an exi ting Band
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

    // Get all categories (optionally by language)
    getAllCategories: build.query({
      query: (lang?: string) => ({
        url: `${url}`,
        method: "GET",
        params: lang ? { lang } : "en",
      }),
      providesTags: ["brand"],
    }),

    // Get a single Band by ID (optionally with lang param)
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
  useGetAllCategoriesQuery,

  useGetBandByIdQuery,
} = BandApi;
