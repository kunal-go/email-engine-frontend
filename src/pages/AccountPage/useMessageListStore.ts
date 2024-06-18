import { useCallback } from "react";
import { apiGetMessageList } from "../../apis/message/apiGetMessageList";
import { useQueryStore } from "../../common/hooks";

type StoreShape = Awaited<ReturnType<typeof apiGetMessageList>>["data"];

function getQueryKey(mailFolderId: string, page: number) {
  return ["message-list", mailFolderId, `page:${page}`];
}

export function useMessageListStore(
  accountId: string,
  mailFolderId: string,
  page: number,
  size: number
) {
  const queryKey = getQueryKey(mailFolderId, page);
  const queryFn = useCallback(async () => {
    const { data } = await apiGetMessageList({
      accountId,
      mailFolderId,
      page,
      size,
    });
    return data;
  }, [accountId, mailFolderId, page, size]);

  return useQueryStore<StoreShape>(queryKey, queryFn);
}
