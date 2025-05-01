import { baseApi } from "./baseApi";

const url = "/articles";

const articleApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createArticle: build.mutation({
      query: (data: any) => ({
        url: url,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["article"],
    }),

    updateArticle: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `${url}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["article"],
    }),

    getAllArticle: build.query({
      query: (lang: "en" | "bn") => ({
        url: `${url}?lang=${lang} `,
        method: "GET",
      }),
      providesTags: ["article"],
    }),

    deleteArticle: build.mutation({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["article"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
