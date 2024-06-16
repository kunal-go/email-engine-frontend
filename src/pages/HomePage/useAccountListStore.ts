import { useCallback } from "react";
import { apiGetAccountList } from "../../apis/account/apiGetAccountList";
import { useQueryStore } from "../../common/hooks";

type StoreShape = Awaited<ReturnType<typeof apiGetAccountList>>["data"];

export function useAccountListStore() {
  const queryKey = "account-list";
  const queryFn = useCallback(async () => {
    const { data } = await apiGetAccountList();
    return data;
  }, []);

  return useQueryStore<StoreShape>(queryKey, queryFn);
}
