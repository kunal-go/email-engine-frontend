import { useCallback } from "react";
import { apiGetMailFolderList } from "../../apis/mailFolder/apiGetMailFolderList";
import { useQueryStore } from "../../common/hooks";

type StoreShape = Awaited<ReturnType<typeof apiGetMailFolderList>>["data"];

function getQueryKey(accountId: string) {
  return ["mail-folder", accountId];
}

export function useMailFolderListStore(accountId: string) {
  const queryKey = getQueryKey(accountId);
  const queryFn = useCallback(async () => {
    const { data } = await apiGetMailFolderList(accountId);
    return data;
  }, [accountId]);

  return useQueryStore<StoreShape>(queryKey, queryFn);
}
