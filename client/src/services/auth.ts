import jwtDecode from 'jwt-decode';
import { HttpService } from './http';
import { userInfoStorage } from './user-info-storage';

export interface UserInfo {
  id: string;
  email: string;
}

export class AuthService {
  private http = new HttpService();

  async login(email: string, password: string) {
    const body = await this.http.post<{ token: string }>(
      '/users/login',
      { 
        body: {email, password} 
      }
    );

    userInfoStorage.save(body.token);

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
    userInfoStorage.clear();
  }
}

export const authService = new AuthService();
