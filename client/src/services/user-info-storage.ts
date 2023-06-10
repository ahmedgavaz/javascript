import jwtDecode from "jwt-decode";
import { LocalStorage } from "../lib/LocalStorage";

export interface UserInfo {
  id: string;
  email: string;
}

export type AuthHandler = (user: UserInfo | undefined) => void;

class UserInfoStorage {
  private handler: AuthHandler | undefined = undefined;
  private storage = new LocalStorage('token')

  setHandler(handler: AuthHandler | undefined) {
    this.handler = handler;
  }

  get token() {
    return this.storage.get();
  }

  save(token: string) {
    this.storage.set(token);
    this.handler?.(this.userInfo);
  }

  clear() {
    this.handler?.(undefined);
    this.storage.clear()
  }

  get userInfo() {
    const token = this.token;

    return token ? this.userInfoFromToken(token) : undefined;
  }

  private userInfoFromToken(token: string): UserInfo {
    return jwtDecode(token);
  }
}

export const userInfoStorage = new UserInfoStorage()
