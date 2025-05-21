import { baseApi } from "./baseApi";

const url = "/articles";

const articleApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getAllArticles: build.query({
      query: (query: string) => ({
        url: `${url}?${query}`,
        method: "GET",
      }),
      providesTags: ["article"],
    }),

    createArticle: build.mutation({
      query: (data: any) => ({
        url: url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["article"],
    }),

    updateArticle: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `${url}?id=${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["article"],
    }),

    deleteArticle: build.mutation({
      query: (id: string) => ({
        url: `${url}?id=${id}`,
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
