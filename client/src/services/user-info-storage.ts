import jwtDecode from "jwt-decode";

export interface UserInfo {
  id: string;
  email: string;
}

export type AuthHandler = (user: UserInfo | null) => void;

class UserInfoStorage {
  private handler: AuthHandler | null = null;

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  save(token: string) {
    window.localStorage.setItem('token', token);
    this.handler?.(this.userInfo);
  }

  clear() {
    this.handler?.(null);
    window.localStorage.removeItem('token');
  }

  get userInfo() {
    const token = this.token;

    return token ? this.userInfoFromToken(token) : null;
  }

  private userInfoFromToken(token: string): UserInfo {
    return jwtDecode(token);
  }
}

export const userInfoStorage = new UserInfoStorage()

