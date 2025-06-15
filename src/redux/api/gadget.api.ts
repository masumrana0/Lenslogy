import { baseApi } from "./baseApi";

const url = "/gadget";

const gadgetApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getOneGadget: build.query({
      query: ({ baseId, lang }: { baseId: string; lang: "en" | "bn" }) => ({
        url: `${url}?baseId=${baseId}&lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["gadget"],
    }),

    getAllGadgets: build.query({
      query: ({ lang, query }: { query: string; lang: string }) => ({
        url: `${url}${query}&lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["gadget"],
    }),

    createGadget: build.mutation({
      query: (data: FormData) => ({
        url: url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gadget"],
    }),

    updateGadget: build.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["gadget"],
    }),

    deleteGadget: build.mutation({
      query: (id: string) => ({
        url: `${url}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gadget"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOneGadgetQuery,
  useGetAllGadgetsQuery,
  useCreateGadgetMutation,
  useUpdateGadgetMutation,
  useDeleteGadgetMutation,
} = gadgetApi;
