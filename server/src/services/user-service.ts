import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { UserAlreadyExistError } from "../errors";
import { z } from "zod";

export const UserInputSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2).refine(value => value.includes('@'), 'Email must contain @'),
    password: z.string().min(5),
    age: z.number().optional()
  })
type UserInput = z.infer<typeof UserInputSchema>;
  
const SALT_ROUNDS = 10;
  
export class UserService {
async registration(input:UserInput) {
    const cryptedPassword = await bcrypt.hash(input.password,SALT_ROUNDS );
    const mail=input.email;
    const user = await UserModel.query().findOne({email:mail});
    if (!user){
        input.password=cryptedPassword;
        return await UserModel.query().insert(input);
    }else{
        throw new UserAlreadyExistError("User with this email already exists!");
    }
}

async findById(id:number) {
    return await UserModel.query().findById(id);
}

async login(email:string,password:string) {
   const result = await UserModel.query().findOne({email});
   if (!result){
    return null;
   }
   const samePassword = await bcrypt.compare(password,result.password);
   if (!samePassword){
    return null;
   }else{
    return result;
   }
}    
}
