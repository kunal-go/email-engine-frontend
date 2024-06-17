import { HttpApi } from "../../core";

type ResponseShape = {
  url: string;
};

export async function apiGetMicrosoftAuthUrl() {
  const httpApi = new HttpApi<ResponseShape>(
    "get",
    "account/microsoft-auth/url"
  );
  return await httpApi.send({ useAccessToken: true });
}
