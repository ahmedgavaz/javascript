import { Router } from "express";
import { UserInputSchema, UserService } from "../services/user-service";
import { requestHandler } from "../middlewares/request-handler";
import { NotEnoughParametersError, NotFoundError, UserAlreadyExistError } from "../errors";
import { JwtService } from "../services/jwt-service";
import { z } from "zod";
import { UserTransformer } from "../transformers/user-transformer";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();
const userService = new UserService();
const jwtService = new JwtService();
const userTransformer = new UserTransformer();

const IdInputSchema= z.object({
  id: z.coerce.number()
})

userRouter.post('/registration',requestHandler(async(req,res) =>{
  const input = req.body;
    const request = UserInputSchema.parse({ name: input.name,
      age:input.age,
      password:input.password,
      email:input.email,});

    const user= await userService.registration(request)

    return { result: userTransformer.transform(user) };
}));


  const LoginInputSchema = z.object({
    email: z.string(),
    password: z.string()
})
  

userRouter.post('/login',requestHandler(async(req,res) =>{
  const {email,password} = LoginInputSchema.parse(req.body);

  if (!password || !email){
    throw new NotEnoughParametersError("Error in parameters!")
  }

  try{
    const user = await userService.login(email,password);

    if (!user){
      throw new NotFoundError("Not found"); 
    }

    const token = jwtService.create({ id: user.id ,email:user.email});
    await wait(3000);

    res.send({token});}
  catch(error){
    if (error instanceof NotFoundError) {
      res.status(400).send({ message: error.message });
      return;
    }
  }
  }));

  export function wait(ms:number){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve(undefined);
      },ms) 
    })
  }

  userRouter.get('/:id',authMiddleware,requestHandler(async(req,res) =>{
    const {id} = IdInputSchema.parse(req.params);
      const user= await userService.findById(id);
      if (!user){
        throw new NotFoundError("Not found"); 
      }
      console.log(user.name)
  
      return {name:user.name};
  }));
  
export {userRouter};