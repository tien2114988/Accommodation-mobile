import { User } from "./../users/index";
import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Response } from "@/types/response";
import { Address, BankAccount } from "@/types/types";
import { FreelancerWorkModel } from "@/types/workTypes";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  birthdate: Date;
  gender: string;
  phone: string;
}

export interface SignUpResponse {
  token: string;
}

export interface VerifyJwtForUserRequest {
  token: string;
}

const baseUrl = "/auth";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/sign-in`,
        method: "POST",
        body: credentials,
      }),
    }),
    signup: build.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: `${baseUrl}/sign-up`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyJwtForUser: build.query<User, any>({
      query: (token) => ({
        url: `/users/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyJwtForUserQuery } =
  authApi;
export default authApi;
