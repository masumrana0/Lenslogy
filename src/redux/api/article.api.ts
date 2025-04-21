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

    // getAllArticles: build.query({
    //   query: (args:  []) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item:  ) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: url,
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["article"],
    // }),
    getArticleById: build.query({
      query: (id: string) => ({
        url: `${url}/${id}`,
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
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
} = articleApi;
