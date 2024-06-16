import { useCallback } from "react";
import { apiGetMessageList } from "../../apis/message/apiGetMessageList";
import { useQueryStore } from "../../common/hooks";

type StoreShape = Awaited<ReturnType<typeof apiGetMessageList>>["data"];

function getQueryKey(mailFolderId: string) {
  return ["message-list", mailFolderId];
}

export function useMessageListStore(accountId: string, mailFolderId: string) {
  const queryKey = getQueryKey(mailFolderId);
  const queryFn = useCallback(async () => {
    const { data } = await apiGetMessageList({ accountId, mailFolderId });
    return data;
  }, [accountId, mailFolderId]);

  return useQueryStore<StoreShape>(queryKey, queryFn);
}
