import { Router } from "express";
import { UserInputSchema, UserService } from "../services/user-service";
import { authMiddleware } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { NotEnoughParametersError, NotFoundError, UserAlreadyExistError } from "../errors";
import { JwtService } from "../services/jwt-service";
import { z } from "zod";
import { UserTransformer } from "../transformers/user-transformer";

const userRouter = Router();
const userService = new UserService();
const jwtService = new JwtService();
const userTransformer = new UserTransformer();

userRouter.post('/registration',/*authMiddleware,*/ requestHandler(async(req,res) =>{
 /* const {name,password,age,email} = UserInputSchema.parse(req.body);
  if (!name || !password || !email){
    throw new NotEnoughParametersError("Error in parameters!")
  }
  try{
    const user = await userService.registration({name,password,email,age});
    return userTransformer.transform(user);
  }
  catch(error){
    if (error instanceof UserAlreadyExistError) {
      res.status(404).send({ message: error.message });
      return;
    }
  }*/

  const input = req.body;
    const request = UserInputSchema.parse({ name: input.name,
      age:input.age,
      password:input.password,
      email:input.email,});

      console.log(request);
    const user= await userService.registration(request)

    return { result: userTransformer.transform(user) };
}));


  const LoginInputSchema = z.object({
    email: z.string(),
    password: z.string()
})
  

userRouter.post('/login',requestHandler(async(req,res) =>{
  const {email,password} = LoginInputSchema.parse(req.body);

  await wait(2000);

  if (!password || !email){
    throw new NotEnoughParametersError("Error in parameters!")
  }

  try{
    const user = await userService.login(email,password);

    if (!user){
      throw new NotFoundError("Not found"); 
    }

    const token = jwtService.create({ id: user.id ,email:user.email});

    res.send({token});}
  catch(error){
    if (error instanceof NotFoundError) {
      res.status(400).send({ message: error.message });
      return;
    }
  }
  }));

  function wait(ms:number){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve(undefined);
      },ms) 
    })
  }

export {userRouter};