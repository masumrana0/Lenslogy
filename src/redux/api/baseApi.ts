/**
 * Title: 'rtk setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 13-05-2025
 *
 */

import { getBaseUrl } from "@/helper/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ["user", "category", "article", "gadget", "brand", "gadgetType"],
});
