import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError, NotFoundMovieError } from "../errors";
import { date, z } from "zod";
import { MovieModel } from "../models/movie-model";
import { CommentModel } from "../models/comment-model";


export const UserInputSchema = z.object({
    name: z.string().min(2),
    email: z.string().refine(value => value.includes('@'), 'Email must contain @'),
    password: z.string().min(5),
    age: z.number().optional()
  })

 export interface CommentInput{
    movieId:number,
    creatorId:number,
    text: string,
    rating:number,
    published_on:Date;
  }

  export const CommentInputSchema= z.object({
    text: z.string().nonempty(),
    rating:z.number(),
    movieId:z.number().nonnegative(),
    creatorId:z.number().nonnegative(),
    published_on:z.date().refine((value) => value !== undefined, { message: 'Release date cannot be empty' }),
  })

type UserInput = z.infer<typeof UserInputSchema>;
  
export class CommentService {
  async countOfCommentsOfMovie(id: number) {
    const movie = await MovieModel.query().findOne({ id });
    if (!movie) {
      throw new NotFoundMovieError(`Movie not found with id ${id}`);
    }
    const result = await CommentModel.query().where({ movie_id: movie.id }).count('* as count').first();
    return result;
  }
  

  async findCommentsByCreator(id:number) {
    const user = await UserModel.query().findOne({id});
    if (!user){
      throw new NotFoundError("User not found");
    }
    const comments = await CommentModel.query()
      .where('user_id', user.id)
      .withGraphFetched('movie')
      .select('*'); 
    return comments;
    }
    
  async getAverageRatingOfMovie(id:number) {
    const movie = await MovieModel.query().findOne({ id });
    if (!movie) {
      throw new NotFoundMovieError(`Movie not found with id ${id}`);
     }   
    const comments = await CommentModel.query()
      .where('movie_id', movie.id)
      .select('rating');
     if (comments.length === 0) {
        return 0;
      }
     let sum=0;
    for (let i=0;i<comments.length;i++){
        sum+=Number(comments[i].rating);
     }
    return sum / comments.length;
  }
      
  async getAllCommentsForMovie(id: number) {
    const movie = await MovieModel.query().findOne({ id });
    if (!movie) {
       throw new NotFoundMovieError(`Movie not found with id ${id}`);
    }
    const comments = await CommentModel.query().where('movie_id', movie.id).withGraphFetched('creator');
    return comments;
   }

   
   async addComment( movieId:number, creatorId:number, text: string, rating:number, published_on:Date){
    const validatedInput = CommentInputSchema.parse({
      movieId:movieId,
      creatorId:creatorId,
      text: text,
      rating:rating,
      published_on:published_on});

    const movie = await MovieModel.query().findOne({ id: validatedInput.movieId });
    if (!movie) {
      throw new NotFoundMovieError(`Movie not found with id ${validatedInput.movieId}`);
    }

    const creator = await UserModel.query().findOne({ id: validatedInput.creatorId });
    if (!creator) {
      throw new NotFoundError('User not found');
    }

    const comment = await CommentModel.query().insert({
      text: validatedInput.text,
      rating: validatedInput.rating,
      movie_id: validatedInput.movieId,
      user_id: validatedInput.creatorId
    });

    return comment;
  }
}
