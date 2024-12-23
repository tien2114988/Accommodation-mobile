import { API } from '../base';
import { Response } from '@/types/response';
import {
  CreatePostModel,
  CreateTakePostModel,
  PostModel,
  RoomDetailModel,
  TakePostModel,
} from '@/types/postTypes';

const baseUrl = '/posts';

const postApi = API.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<
      PostModel[],
      {
        postType: string;
        offset?: number;
        limit?: number;
        sortBy?: string;
        roomType?: string;
        utilities?: string;
        interior?: string;
        address?: string;
        priceFrom?: number;
        priceTo?: number;
        name?: string;
      }
    >({
      query: ({
        postType,
        offset,
        limit,
        sortBy,
        roomType,
        utilities,
        interior,
        address,
        priceFrom,
        priceTo,
        name,
      }) => {
        const params = new URLSearchParams();

        params.append('postType', postType);

        if (offset !== undefined) {
          params.append('offset', offset.toString());
        }
        if (limit !== undefined) {
          params.append('limit', limit.toString());
        }
        if (sortBy) {
          params.append('sortBy', sortBy);
        }
        if (roomType) {
          params.append('roomType', roomType);
        }
        if (utilities) {
          params.append('utilities', utilities);
        }
        if (interior) {
          params.append('interior', interior);
        }
        if (address) {
          params.append('address', address);
        }
        if (priceFrom !== undefined) {
          params.append('priceFrom', priceFrom.toString());
        }
        if (priceTo !== undefined) {
          params.append('priceTo', priceTo.toString());
        }
        if (name) {
          params.append('name', name);
        }

        return `${baseUrl}?${params.toString()}`;
      },
    }),

    getPostById: build.query<
      PostModel,
      {
        id: number;
      }
    >({
      query: ({ id }) => {
        return `${baseUrl}/${id}`;
      },
    }),

    deletePost: build.mutation<void, number>({
      query: id => ({
        url: `${baseUrl}/${id}`, // Endpoint API cho việc xóa post
        method: 'DELETE', // Sử dụng phương thức HTTP DELETE
      }),
    }),

    getPostsByUserId: build.query<
      PostModel[],
      {
        id?: number;
        postType: string;
        offset?: number;
        limit?: number;
      }
    >({
      query: ({ id, postType, offset, limit }) => {
        const params = new URLSearchParams();

        params.append('postType', postType);

        if (offset !== undefined) {
          params.append('offset', offset.toString());
        }
        if (limit !== undefined) {
          params.append('limit', limit.toString());
        }
        return `/users/${id}${baseUrl}?${params.toString()}`;
      },
    }),

    createPost: build.mutation<PostModel, Partial<CreatePostModel>>({
      query: (newPost: CreatePostModel) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: newPost,
      }),
    }),
    getAllPosts: build.query<RoomDetailModel[], void>({
      query: () => {
        return `${baseUrl}/`;
      },
    }),

    uploadImages: build.mutation<PostModel, { id: number; formData: FormData }>(
      {
        query: ({ id, formData }) => {
          return {
            url: `${baseUrl}/${id}/pictures`,
            method: 'POST',
            body: formData,
          };
        },
      },
    ),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useGetAllPostsQuery,
  useUploadImagesMutation,
  useDeletePostMutation,
} = postApi;
