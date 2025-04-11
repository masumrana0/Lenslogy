/**
 * Title: 'Redux RTK query setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 08-11-2024
 *
 */

import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helper/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ["user", "profile", "partnership", "auth"],
});
