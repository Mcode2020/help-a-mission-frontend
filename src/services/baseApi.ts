import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = '/api';

export const baseApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
      }
      const token = typeof window !== 'undefined' ? localStorage.getItem('ham_token') : null;
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['CMS', 'Campaigns', 'Donations', 'Contact', 'Volunteer', 'Gallery', 'Auth'],
  keepUnusedDataFor: 300, // 5 minutes caching for high performance & deduplication
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

