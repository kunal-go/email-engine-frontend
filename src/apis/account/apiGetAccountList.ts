import { HttpApi } from "../../core";

export enum AccountType {
  Microsoft = "Microsoft",
}

export type AccountResponse = {
  id: string;
  type: AccountType;
  email: string;
  name: string;
  label: string;
  createdAt: number;
};

type ResponseShape = {
  count: number;
  list: AccountResponse[];
};

export async function apiGetAccountList() {
  const httpApi = new HttpApi<ResponseShape>("get", "account");
  return await httpApi.send({ useAccessToken: true });
}
