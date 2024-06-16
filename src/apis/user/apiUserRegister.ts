import { HttpApi } from "../../core";

type RequestBodyShape = {
  username: string;
  password: string;
};

type ResponseShape = {
  accessToken: string;
};

export async function apiUserRegister(payload: RequestBodyShape) {
  const httpApi = new HttpApi<ResponseShape>("post", "user/register");
  return await httpApi.send({ body: payload });
}
