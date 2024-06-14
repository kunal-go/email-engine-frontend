import { HttpApi } from "../../core";

type RequestBodyShape = {
  username: string;
  password: string;
};

type ResponseShape = {
  accessToken: string;
};

export async function apiUserLogin(payload: RequestBodyShape) {
  const httpApi = new HttpApi<ResponseShape>("post", "user/login");
  return await httpApi.send({ body: payload });
}
