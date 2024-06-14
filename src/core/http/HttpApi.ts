import axios, { RawAxiosRequestHeaders } from "axios";
import { HttpStatusCode } from ".";
import { getAccessToken } from "../accessToken";
import { configs } from "../configs";
import { HttpError } from "./HttpError";
import { HttpMethod } from "./types";

type ResponseShape<ResponseDataShape> = {
  data: ResponseDataShape;
  statusCode: HttpStatusCode;
};

export class HttpApi<ResponseDataShape = unknown> {
  readonly endpoint: string;
  readonly method: HttpMethod;

  constructor(method: HttpMethod, endpoint: string) {
    this.endpoint = endpoint;
    this.method = method;
  }

  async send({
    useAccessToken,
    body = null,
    query,
  }: {
    body?: unknown;
    query?: unknown;
    useAccessToken?: boolean;
  } = {}): Promise<ResponseShape<ResponseDataShape>> {
    const headers: RawAxiosRequestHeaders = {};
    if (useAccessToken) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    try {
      const response = await axios({
        baseURL: configs.apiBaseUrl,
        method: this.method,
        url: this.endpoint,
        headers,
        data: body,
        params: query,
      });
      return { statusCode: response.status, data: response.data };
    } catch (err) {
      let statusCode = 500;
      let data = { message: "Something went wrong" };

      const errorResponse = axios.isAxiosError(err) ? err?.response : undefined;
      if (errorResponse) {
        statusCode = errorResponse.status;
        data = errorResponse.data;
      }

      if (statusCode === HttpStatusCode.UNAUTHORIZED) {
        window.location.href = "/logout";
      }

      throw new HttpError(statusCode, data);
    }
  }
}
