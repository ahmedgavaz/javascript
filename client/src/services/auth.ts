import jwtDecode from 'jwt-decode';
import { HttpService } from './http';
import { UserInfoStorage } from './user-info-storage';

export interface UserInfo {
  id: string;
  email: string;
}

type AuthHandler = (user: UserInfo | null) => void;

export class HttpError extends Error {}
export class InvalidCredentialsError extends Error {}

export class AuthService {
  private handler: AuthHandler | null = null;
  private http = new HttpService();
  private tokenStorage = new UserInfoStorage();

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }


  async login(email: string, password: string) {
    const body = await this.http.post<{ token: string }>(
      '/users/login',
      { email, password }
    );

    this.tokenStorage.save(body.token);
    this.handler?.(this.tokenStorage.userInfo);

    /*const response = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const statusCode = response.status;

      if (statusCode === 400) {
        throw new InvalidCredentialsError();
      }

      throw new HttpError();
    }

    const body: { token: string } = await response.json();
    const userInfo = this.userInfoFromToken(body.token);

    window.localStorage.setItem('token', body.token);
    this.handler?.(userInfo);*/
  }

  logout() {
    this.handler?.(null);
    this.tokenStorage.clear();
  }



  getSavedUser() {
    return this.tokenStorage.userInfo;
  }
}

export const authService = new AuthService();
