import { config } from "../config";
import { UserInfoStorage } from "./user-info-storage";

export class HttpError extends Error {}
export class InvalidCredentialsError extends Error {}

export class HttpService {
  private tokenStorage = new UserInfoStorage();

  async get<T>(path: string): Promise<T> {
    return this.request('GET', path, {});
  }

  async post<T>(path: string, body: Record<string, any>): Promise<T> {
    return this.request('POST', path, { body });
  }

  async patch<T>(path: string, body: Record<string, any>): Promise<T> {
    return this.request('PATCH', path, { body });
  }

  async put<T>(path: string, body: Record<string, any>): Promise<T> {
    return this.request('PUT', path, { body });
  }

  async delete<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request('DELETE', path, { body });
  }

  private async request(method: string, path: string, { body }: { body?: Record<string, any>}) {
    const authToken = this.tokenStorage.token;

    const response = await fetch(`${config.serverBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
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

      throw new HttpError();
    }

    return response.json();
  }
}

