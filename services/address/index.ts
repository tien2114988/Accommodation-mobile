import { API } from '../base';
import { DistrictModel, ProvinceModel, WardModel } from '@/types/addressTypes';

const addressApi = API.injectEndpoints({
  endpoints: build => ({
    getProvinces: build.query<ProvinceModel[], void>({
      query: () => {
        return `/provinces`;
      },
    }),

    getDistricts: build.query<DistrictModel[], string>({
      query: (provinceId: string) => {
        return `/districts?provinceId=${provinceId}`;
      },
    }),

    getWards: build.query<WardModel[], string>({
      query: (districtId: string) => {
        return `/communes?districtId=${districtId}`;
      },
    }),
  }),
});

export const { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } =
  addressApi;
