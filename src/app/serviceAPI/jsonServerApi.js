import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["register"],
  endpoints: (builder) => ({
    editProduct: builder.mutation({
      query: (body) => ({
        url: "edit_product",
        method: "PUT",
        body,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (body) => ({
        url: "delete_product",
        method: "DELETE",
        body,
      }),
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "product",
        method: "POST",
        body,
      }),
    }),

    getProducts: builder.query({
      query: () => "products",
    }),

    getProductPhoneNumbers: builder.query({
      query: () => "/phone_numbers",
    }),

    getUser: builder.mutation({
      query: ({ loginId, pwd }) => ({
        url: "login",
        method: "POST",
        body: { loginId, pwd },
      }),
    }),

    createUserAccount: builder.mutation({
      query: ({ surname, firstName, loginId, pwd, confirmPwd }) => ({
        url: "register",
        method: "POST",
        body: { surname, firstName, loginId, pwd, confirmPwd },
      }),
      invalidatesTags: ["register"],
    }),
  }),
});

export const {
  useCreateUserAccountMutation,
  useGetUserMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductPhoneNumbersQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useLogoutMutation,
} = jsonServerApi;
