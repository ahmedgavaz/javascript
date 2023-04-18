
import { config } from "../config";
import { userInfoStorage } from "./user-info-storage";

export class HttpError extends Error {}
export class InvalidCredentialsError extends HttpError {}
export class UnauthorizedError extends HttpError {}

export interface RequestOptions {
  query?: Record<string, string>
  body?: Record<string, any>
}

export class HttpService {
  async get<T>(path: string, options: { query?: Record<string, string> } = {}): Promise<T> {
    return this.request('GET', path, options);
  }

  async post<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('POST', path, options);
  }

  async patch<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('PATCH', path, options);
  }

  async put<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('PUT', path, options);
  }

  async delete<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('DELETE', path, options);
  }

  private async request(method: string, path: string, { body, query }: RequestOptions) {
    const authToken = userInfoStorage.token;

    const queryString = new URLSearchParams(query).toString()

    const response = await fetch(`${config.serverBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}?${queryString}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
      },
      body: body && JSON.stringify(body)
    });

    if (!response.ok) {
      const statusCode = response.status;

      if (statusCode === 400) {
        throw new InvalidCredentialsError();
      }

      if (statusCode === 401) {
        userInfoStorage.clear();

        throw new UnauthorizedError();
      }

      throw new HttpError();
    }

    return response.json();
  }
}

