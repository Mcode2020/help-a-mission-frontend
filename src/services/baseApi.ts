import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = '/api';

export const baseApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['CMS', 'Campaigns', 'Donations', 'Contact', 'Volunteer', 'Gallery'],
  keepUnusedDataFor: 300, // 5 minutes caching for high performance & deduplication
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
