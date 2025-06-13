 
import { baseApi } from "./baseApi";

const url = "/gadget/type";

const gadgetTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a new GadgetType
    createGadgetType: build.mutation<{ message: string }, { name: string }>({
      query: (data) => ({
        url: `${url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gadgetType"],
    }),

    // Update GadgetType by ID
    updateGadgetType: build.mutation<
      { message: string },
      { id: string; name: string }
    >({
      query: ({ id, name }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["gadgetType"],
    }),

    // Delete GadgetType by baseId
    deleteGadgetType: build.mutation<{ message: string }, string>({
      query: (baseId) => ({
        url: `${url}?baseId=${baseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gadgetType"],
    }),

    // Get all GadgetTypes
    getAllGadgetType: build.query({
      query: (lang) => ({
        url: `${url}`,
        method: "GET",
        params: { lang: lang || "en" },
      }),
      providesTags: ["gadgetType"],
    }),

    // Get a single GadgetType by ID
    getGadgetTypeById: build.query<any, { id: string; lang?: "en" | "bn" }>({
      query: ({ id, lang }) => ({
        url: `${url}/${id}`,
        method: "GET",
        params: { lang: lang || "en" },
      }),
      providesTags: ["gadgetType"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateGadgetTypeMutation,
  useUpdateGadgetTypeMutation,
  useDeleteGadgetTypeMutation,
  useGetAllGadgetTypeQuery,
  useGetGadgetTypeByIdQuery,
} = gadgetTypeApi;

export default gadgetTypeApi;
