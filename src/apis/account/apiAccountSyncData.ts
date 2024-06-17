import { HttpApi } from "../../core";

export async function apiAccountSyncData(accountId: string) {
  const httpApi = new HttpApi("post", `account/${accountId}/sync`);
  return await httpApi.send({ useAccessToken: true });
}
