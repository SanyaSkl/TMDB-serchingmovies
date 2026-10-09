import type { RootState } from './store.ts'
import { tmdbApi } from '../api/tmdbApi.ts'

export const selectIsFetching = (state: RootState) =>
  Object.values(state[tmdbApi.reducerPath].queries).some(query => query?.status === 'pending')
