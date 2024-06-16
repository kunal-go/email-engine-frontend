import { HttpApi } from "../../core";

export type MailFolderResponse = {
  id: string;
  externalId: string;
  name: string;
  itemCount: number;
  unreadItemCount: number;
  syncedItemCount: number;
  lastSyncedAt: number | null;
};

type ResponseShape = {
  count: number;
  list: MailFolderResponse[];
};

export async function apiGetMailFolderList(accountId: string) {
  const httpApi = new HttpApi<ResponseShape>(
    "get",
    `account/${accountId}/mail-folder`
  );
  return await httpApi.send({ useAccessToken: true });
}
