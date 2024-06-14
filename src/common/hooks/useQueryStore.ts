import { useCallback, useState } from "react";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "react-query";

export function useQueryStore<T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T, QueryKey>,
  options: UseQueryOptions<T, Error> = {}
) {
  const [enabled, setEnabled] = useState(false);
  useQuery<T, Error>(queryKey, queryFn, { ...options, enabled });
  const fetch = useCallback(() => setEnabled(true), [setEnabled]);

  const queryClient = useQueryClient();
  const getState = useCallback(() => {
    const state = queryClient.getQueryState<T, Error>(queryKey);

    const data = state?.data;
    const error = state?.error;
    const status = state?.status;
    const isLoading = state?.status === "loading";

    return { data, error, status, isLoading };
  }, [queryClient, queryKey]);

  const invalidate = useCallback(
    () => queryClient.invalidateQueries(queryKey),
    [queryClient, queryKey]
  );

  const queryKeyForAllInvalidation: QueryKey =
    typeof queryKey === "string" ? queryKey : (queryKey[0] as string);
  const invalidateAll = useCallback(
    () => queryClient.invalidateQueries(queryKeyForAllInvalidation),
    [queryClient, queryKeyForAllInvalidation]
  );

  return { fetch, getState, invalidate, invalidateAll };
}
