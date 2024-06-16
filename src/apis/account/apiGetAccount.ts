import { HttpApi } from "../../core";
import { AccountResponse } from "./apiGetAccountList";

type RequestBodyShape = {
  accountId: string;
};

export async function apiGetAccount(body: RequestBodyShape) {
  const httpApi = new HttpApi<AccountResponse>(
    "get",
    `account/${body.accountId}`
  );
  return await httpApi.send({ body, useAccessToken: true });
}
