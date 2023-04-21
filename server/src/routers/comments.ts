import { Router } from "express";
import { UserInputSchema, UserService } from "../services/user-service";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError, NotEnoughParametersError, NotFoundError } from "../errors";

import { z } from "zod";
import { CommentTransformer } from "../transformers/comment-transformer";
import { CommentInputSchema, CommentService } from "../services/comment-service";

const commentRouter = Router();
const commentService = new CommentService();
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

  commentRouter.post('/', requestHandler(async (req, res) => {
    const commentInput = CommentInputSchema.parse(req.body);
    if(!commentInput.creatorId || !commentInput.movieId || !commentInput.published_on ||  !commentInput.rating || !commentInput.text ){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const comment = await commentService.addComment(commentInput.movieId,commentInput.creatorId,commentInput.text,commentInput.rating,commentInput.published_on);
    return commentTransformer.transform(comment);
  }));
  

export {commentRouter};