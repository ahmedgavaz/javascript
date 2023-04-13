import jwtDecode from 'jwt-decode';

export interface UserInfo {
  id: string;
  email: string;
}

type AuthHandler = (user: UserInfo | null) => void;

export class HttpError extends Error {}
export class InvalidCredentialsError extends Error {}

class AuthService {
  private handler: AuthHandler | null = null;

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }

  async login(email: string, password: string) {
    const response = await fetch('http://localhost:3001/users/login', {
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
    this.handler?.(userInfo);
  }

  logout() {
    this.handler?.(null);
    window.localStorage.removeItem('token');
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  getSavedUser() {
    const token = this.token;

    return token ? this.userInfoFromToken(token) : null;
  }

  private userInfoFromToken(token: string): UserInfo {
    return jwtDecode(token);
  }
}

export const authService = new AuthService();
