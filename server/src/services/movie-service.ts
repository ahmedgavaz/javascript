import { z } from "zod";
import { NotFoundMovieError } from "../errors";
import { userFromLocals } from "../middlewares/auth";
import { MovieModel } from "../models/movie-model";

interface MovieUpdate {
    title?: string;
    description?: string;
    budget?: number;
    stars?: string;
    director?: string;
    language?: string;
    country?: string;
    release_date?: Date;
    creator_id?:number;
  }
 const MovieCriteriaSchema = z.object({
    title: z.string().optional(),
    country: z.string().optional(),
    release_date: z.date().optional(),
    budget: z.number().optional(),
    director: z.string().optional(),
    star: z.string().optional(),
    description: z.string().optional(),
    language:z.string().optional()
  });
  
  export type MovieCriteria = z.infer<typeof MovieCriteriaSchema>;
  

export class MovieService {
    async addMovie(title:string, language:string, countryOfOrigin:string,releaseDate?:Date, description?:string, budget?:number, stars?:string, director?:string,creatorId?:number) {
        return await MovieModel.query().insert({ title: title, release_date:releaseDate, description: description,
        budget:budget,stars:stars,director:director,language:language,country_of_origin:countryOfOrigin,creator_id:creatorId});
    }
    async deleteMovieById(id:number) {
        return await MovieModel.query().deleteById(id);
    }
    async deleteMovieByTitle(title:string) {
        return await MovieModel.query().where('title', title).delete();
    }

    async findMovie(id:number) {
        return await MovieModel.query().findById(id);
    }
    async showMovies(pageNumber: number, size: number) {
        const offset = pageNumber * size;
         const limit = size;
         return await MovieModel.query().select().offset(offset).limit(limit);
    }
    async showAllMovies() {
       return await MovieModel.query().select();
  }
    async findMovieByCriteria(filters:MovieCriteria){
        return await MovieModel.query().findOne({
            title:filters.title,
            country_of_origin:filters.country,
            release_date:filters.release_date,
            budget:filters.budget,
            director:filters.director,
            star:filters.star
        }).skipUndefined();
    }

    async findMovieByTitle(title:string){
      return await MovieModel.query().findOne({
          title:title
      }).skipUndefined();
  }

    async countOfLikes(id: number){
        const movie = await MovieModel.query().findOne({ id });
        if (!movie) {
          throw new NotFoundMovieError(`Movie not found with id ${id}`);
          }
        const likes = await movie.$relatedQuery('likedBy').count();
        return likes;
      }

    async editMovieById(id: number, updates: MovieUpdate): Promise<MovieModel | null> {
        const movie = await MovieModel.query().findById(id);
        if (!movie) {
          return null;
        }
        const updatedMovie = await movie.$query().patchAndFetch(updates);
        return updatedMovie;
      }

      create(input: MovieCriteria, userId: number) {
        return MovieModel.query().insert({
          ...input,
          creator_id: userId,
        });
      }
    
}
