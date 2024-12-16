import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";

export interface User {
  id?: string;
  picture: string;
  email: string;
  birthdate: Date;
  name: string;
  gender: string;
  phone: string;
}

const usersApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    getUsers: build.query<User[], string>({
      query: () => `users`,
    }),
  }),
});

export const { useLazyGetUserQuery } = usersApi;
