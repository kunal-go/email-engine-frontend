import { HttpApi } from "../../core";

type RequestPayloadShape = {
  authorizationCode: string;
};

type ResponseShape = {
  url: string;
};

export async function apiLinkMicrosoftAccount(body: RequestPayloadShape) {
  const httpApi = new HttpApi<ResponseShape>(
    "post",
    "account/microsoft-auth/link"
  );
  return await httpApi.send({ body, useAccessToken: true });
}
