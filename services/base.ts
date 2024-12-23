import { Config } from "@/config";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import {
  BaseQueryApi,
  BaseQueryResult,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers, api) => {
    try {
      // Fetch the token from SecureStore
      const token = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);
      // console.log("token in base API:", token);

      // If the token exists, set the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<BaseQueryResult<any>> => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }

  // if (result.error) {
  //   return result.error;
  // }

  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ["Posts", "PostsByCustomerId", "TakePostsByFreelancerId", "User"],
});
