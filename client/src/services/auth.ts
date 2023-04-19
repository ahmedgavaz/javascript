import { HttpError, HttpService } from './http';
import { userInfoStorage } from './user-info-storage';

export class InvalidCredentialsError extends Error {}

export class AuthService {
  private http = new HttpService();

  async login(email: string, password: string) {
    try {
      const body = await this.http.post<{ token: string }>(
        '/users/login',
        {
          body: { email, password }
        }
      );

      userInfoStorage.save(body.token);
    } catch (error) {
      if (error instanceof HttpError && error.status === 400) {
        throw new InvalidCredentialsError()
      }

      throw error
    }
  }

  logout() {
    userInfoStorage.clear();
  }
}

export const authService = new AuthService();

