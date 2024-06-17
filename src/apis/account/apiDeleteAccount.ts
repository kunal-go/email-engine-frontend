import { HttpApi } from "../../core";

export async function apiDeleteAccount(accountId: string) {
  const httpApi = new HttpApi("delete", `account/${accountId}`);
  return await httpApi.send({ useAccessToken: true });
}
