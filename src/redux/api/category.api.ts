import { baseApi } from "./baseApi";

const url = "/categories";

const categoryApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Create a new category
    createCategory: build.mutation({
      query: (data: { name: string }) => ({
        url: `${url}`,
        method: "POST",
        data,
      }),
      invalicreatedAts ags: ["category"],
    }),

    // Upcrea ed t an exi ting category
    upcreatedAtCate ory: build.mutation({
      query: (data: { id: string; name: string }) => ({
        url: `${url}`,
        method: "PATCH",
        data,
      }),
      invalicreatedAts ags: ["category"],
    }),

    // Delete a category
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `${url}?baseId=${id}`,
        method: "DELETE",
      }),
      invalicreatedAts ags: ["category"],
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
  useUpcreatedAtCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
