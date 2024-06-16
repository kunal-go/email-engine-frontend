import { useCallback } from "react";
import { apiGetAccount } from "../../apis";
import { useQueryStore } from "../../common/hooks";

type StoreShape = Awaited<ReturnType<typeof apiGetAccount>>["data"];

function getQueryKey(accountId: string) {
  return ["account", accountId];
}

export function useAccountStore(accountId: string) {
  const queryKey = getQueryKey(accountId);
  const queryFn = useCallback(async () => {
    const { data } = await apiGetAccount({ accountId });
    return data;
  }, [accountId]);

  return useQueryStore<StoreShape>(queryKey, queryFn);
}
