import { baseApi } from "./baseApi";

const url = "/user";

const userApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Create a new User
    createUser: build.mutation({
      query: (data: any) => ({
        url: `${url}/create-user`,
        method: "POST",
        body: data, // ✅ FIXED
      }),
      invalidatesTags: ["user"],
    }),

    // Update an existing User
    updateUser: build.mutation({
      query: ({ data }: any) => ({
        url: url,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // Delete a User
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `${url}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    // Get all users
    getAllUser: build.query({
      query: () => ({
        url: `${url}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
} = userApi;

export default userApi;
