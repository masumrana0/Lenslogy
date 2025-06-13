import { Language } from "@prisma/client";
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
      query: (query: string) => ({
        url: `${url}?${query}`,
        method: "GET",
      }),
      providesTags: ["gadget"],
    }),

    createGadget: build.mutation({
      query: (data: any) => ({
        url: url,
        method: "POST",
        body: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["gadget"],
    }),

    updateGadget: build.mutation({
      query: ({ formData, id }: { formData: any; id: string }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        body: formData,
        contentType: "multipart/form-data",
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
