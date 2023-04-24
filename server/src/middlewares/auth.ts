import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user-model";
import { JwtService } from "../services/jwt-service";
import { UserService } from "../services/user-service";

const userService = new UserService();

const jwtService = new JwtService();

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    response.status(401).send({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  let userId;

  try {
    const { id } = jwtService.parse(token);
    userId = id;
  } catch (error) {
    response.status(401).send({ message: "Unauthorized" });
    return;
  }

  const user = await userService.findById(Number(userId));

  if (!user) {
    response.status(401).send({ message: "Unauthorized" });
    return;
  }

  response.locals.user = user;
  next();
}

export function userFromLocals(res:Response):UserModel{
  return res.locals.user;
}
