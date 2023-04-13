import jwtDecode from "jwt-decode";

export interface UserInfo {
  id: string;
  email: string;
}

export class UserInfoStorage {
  get token() {
    return window.localStorage.getItem('token');
  }

  save(token: string) {
    window.localStorage.setItem('token', token);
  }

  clear() {
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

