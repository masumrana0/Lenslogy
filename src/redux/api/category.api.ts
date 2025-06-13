import { baseApi } from "./baseApi";

const url = "/categories";

const categoryApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Create a new category
    createCategory: build.mutation({
      query: (data: { name: string }) => ({
        url: `${url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // Upcrea ed t an exi ting category
    updateCategory: build.mutation({
      query: ({ name, id }: { id: string; name: string }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        body: { name: name },
      }),
      invalidatesTags: ["category"],
    }),

    // Delete a category
    deleteCategory: build.mutation({
      query: (baseId: string) => ({
        url: `${url}?baseId=${baseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),

    // Get all categories (optionally by language)
    getAllCategories: build.query({
      query: (lang?: string) => ({
        url: `${url}`,
        method: "GET",
        params: lang ? { lang } : "en",
      }),
      providesTags: ["category"],
    }),

    // Get a single category by ID (optionally with lang param)
    getCategoryById: build.query({
      query: ({ id, lang }: { id: string; lang?: "en" | "bn" }) => ({
        url: `${url}/${id}`,
        method: "GET",
        params: lang ? { lang } : "en",
      }),
      providesTags: ["category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,

  useGetCategoryByIdQuery,
} = categoryApi;
