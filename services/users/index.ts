import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";

export interface User {
  id?: number;
  picture: string;
  email: string;
  birthdate: Date;
  name: string;
  gender: string;
  phone: string;
  postCount: number;
}
export interface UploadAvtRequest {
  file: FormData;
  id: number;
}
const usersApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    getUsers: build.query<User[], string>({
      query: () => `users`,
    }),
    updateUser: build.mutation<string, Partial<User>>({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    uploadAvatar: build.mutation<string, any>({
      query: (data) => ({
        url: `users/${data.id}/picture`,
        method: "POST",
        body: data.file,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} = usersApi;
