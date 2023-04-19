import { Router } from "express";
import { UserInputSchema, UserService } from "../services/user-service";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError, NotEnoughParametersError, NotFoundError } from "../errors";
import { config } from "../config";
import { JwtService } from "../services/jwt-service";
import { z } from "zod";
import { UserTransformer } from "../transformers/user-transformer";
import { CommentService } from "../services/comment-service";
import { CommentModel } from "../models/comment-model";
import { CommentTransformer } from "../transformers/comment-transformer";

const commentRouter = Router();
const commentService = new CommentService();
const jwtService = new JwtService();
const userTransformer = new UserTransformer();
const commentTransformer = new CommentTransformer();

const IdInputSchema= z.object({
  id: z.coerce.number()
})

  commentRouter.get('/:id/comments-by-creator', requestHandler(async(req,res) =>{
    const {id} = IdInputSchema.parse(req.params);
    if (!id){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const comments = await commentService.findCommentsByCreator(id);
    if (!comments){
      throw new NotFoundError("Not founded comments by this creator!");
    }
    return commentTransformer.transformArray(comments);
  }));
  
  commentRouter.get('/:id/average-rating', requestHandler(async(req,res) =>{
    const {id} = IdInputSchema.parse(req.params);
    if (!id){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const rating = await commentService.getAverageRatingOfMovie(id);
    return {rating};
  }));

export {commentRouter};