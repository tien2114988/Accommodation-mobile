import { API } from '../base';
import { Response } from '@/types/response';
import {
  CreatePostModel,
  CreateTakePostModel,
  PostModel,
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
        // Tạo query string từ các tham số truyền vào
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

        // Kết hợp base URL và query string
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

    getPostsByUserId: build.query<
      PostModel[],
      {
        id: number;
      }
    >({
      query: ({ id }) => {
        return `/users/${id}${baseUrl}`;
      },
      // providesTags: (result, error, { id }) => [
      //   { type: 'PostsByCustomerId', id },
      // ],
    }),

    createPost: build.mutation<Response<PostModel>, Partial<CreatePostModel>>({
      query: (newPost: CreatePostModel) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: (result, error, newPost) => [
        { type: 'PostsByCustomerId', id: newPost.customerId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),

    takePost: build.mutation<
      Response<TakePostModel>,
      Partial<CreateTakePostModel>
    >({
      query: (createTakePost: CreateTakePostModel) => {
        const { id, ...body } = createTakePost;
        return {
          url: `${baseUrl}/${id}/takePost`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: (result, error, takePost) => [
        { type: 'TakePostsByFreelancerId', id: takePost.freelancerId }, // Đánh dấu các cache liên quan cần làm mới
      ],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useTakePostMutation,
  useGetPostsByUserIdQuery,
} = postApi;
