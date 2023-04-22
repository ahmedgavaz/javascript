import { HttpService } from "./http";

export interface UserInput {
  name:string,
  age:number,
  email:string,
  password:string,
}


class UserService {
  private http = new HttpService();


  async create(input: UserInput) {
    const user= await this.http.post<UserInput>('users/registration', {
      body: input
    })
    return user;
  }

}
  
  export const userService = new UserService();