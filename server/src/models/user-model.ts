import { Model } from "objection";
import { BaseModel } from "./base-model";

class UserModel extends BaseModel{
    static readonly tableName = 'users';

    age!: number | null;
    email!: string;
    name!:string;
    password!:string;
}

export { UserModel };