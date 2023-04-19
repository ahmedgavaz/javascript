import { UserModel } from "../models/user-model";

export class UserTransformer {
  transform(user: UserModel) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}

