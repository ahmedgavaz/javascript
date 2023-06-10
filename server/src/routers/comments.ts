import { Router } from "express";
import { requestHandler } from "../middlewares/request-handler";
import { NotEnoughParametersError, NotFoundError } from "../errors";
import { z } from "zod";
import { CommentTransformer } from "../transformers/comment-transformer";
import { CommentInputSchema, CommentService } from "../services/comment-service";
import { authMiddleware } from "../middlewares/auth";

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

  commentRouter.delete('/:id',authMiddleware, requestHandler(async(req,res) =>{
    const {id} = IdInputSchema.parse(req.params);
    if (!id){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const comments = await commentService.deleteCommentsWithMovieId(id);
    return comments;
  }));

  commentRouter.post('/', requestHandler(async (req, res) => {
    const er =req.body

    er.published_on = new Date(er.published_on)
    const commentInput = CommentInputSchema.parse(er);
    if(!commentInput.user_id || !commentInput.movie_id || !commentInput.published_on ||  !commentInput.rating || !commentInput.text ){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const comment = await commentService.addComment(commentInput.movie_id,commentInput.user_id,commentInput.text,commentInput.rating,commentInput.published_on);
    return commentTransformer.transform(comment);
  }));
  

export {commentRouter};