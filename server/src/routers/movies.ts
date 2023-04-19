import { Router } from "express";
import { BadRequestError, NotEnoughParametersError, NotFoundError } from "../errors";
import { authMiddleware, userFromLocals } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { MovieModel } from "../models/movie-model";
import { z } from "zod";
import { MovieCriteria, MovieService } from "../services/movie-service";
import { CommentService } from "../services/comment-service";
import { MovieTransformer } from "../transformers/movie-transformer";
import { CommentTransformer } from "../transformers/comment-transformer";

const movieRouter = Router();
const commentService = new CommentService();
const movieService = new MovieService();
const movieTransformer = new MovieTransformer();
const commentTransformer = new CommentTransformer();

const CriteriaZodSchema = z.object({
  title:z.string().optional(),
  country:z.string().optional(),
  release_date:z.date().optional(),
  budget:z.number().optional(),
  director:z.string().optional(),
  star:z.string().optional()
})

const PostZodSchema = z.object({
  title:z.string(),
  country_of_origin:z.string(),
  release_date:z.date(),
  budget:z.number(),
  director:z.string(),
  stars:z.string(),
  description:z.string(),
  language:z.string().optional()
})


const SizePageZodSchema = z.object({
  size:z.coerce.number(),
  page:z.coerce.number()
})

const IdZodSchema = z.object({
  id:z.coerce.number()
})

movieRouter.get('',authMiddleware, requestHandler(async(req,res) =>{
  /* const { size, page } = SizePageZodSchema.parse(req.query);
   if (!size || !page){
     throw new NotEnoughParametersError("Error in parameters!");
    }
    if (Number.isNaN(page) || Number.isNaN(size)) {
      throw new BadRequestError("Page and size should be numbers");
    }*/
      const movies = await movieService.showAllMovies();
     return movieTransformer.transformArray(movies);
 }));


movieRouter.get('/:id/comments', requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!")
  }
  const comments = await commentService.getAllCommentsForMovie(id);
  if (!comments){
    throw new NotFoundError("Not founded comments for this movie!");
  }
  return comments;
}));


movieRouter.get("/get-by-criteria", requestHandler(async (req, res) => {
  const movie = await movieService.findMovieByCriteria(CriteriaZodSchema.parse(req.body));

  if (!movie) {
    throw new NotFoundError('not found movie with these parameter/s!');
  }

  return movieTransformer.transform(movie);
}));


movieRouter.post('/',authMiddleware, requestHandler(async (req, res) => {
    /*const { title, release_date, description, budget, stars, director, language, country } = PostZodSchema.parse(req.body);
    if (!title || !release_date || !description || !budget  || !stars || !director || !language || !country){
      throw new NotEnoughParametersError("Error in parameters!");
    }
    const numberBudget = Number(budget);
    const [year, month, day] = release_date.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
      
    const newMovie = await movieService.addMovie(title, language, country,date, description, numberBudget, stars, director,userFromLocals(res).id);
    return movieTransformer.transform(newMovie);*/
 
    const input = req.body;
    const [year, month, day] = input.release_date.split("-");
    const released = new Date(Number(year), Number(month) , Number(day.slice(0,2)));
 
    const request = PostZodSchema.parse({ title: input.title,
      country_of_origin:input.country_of_origin,
      release_date:released,
      budget:Number(input.budget),
      director:input.director,
      stars:input.stars,
      description:input.description,
      language:input.language ? input.language : undefined});
    const user = userFromLocals(res);

    console.log(request.country_of_origin)
    const movie= await movieService.create(request, user.id)

    return { result: movieTransformer.transform(movie) };
}));

movieRouter.delete("/:id", authMiddleware, requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);

  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const movie = await movieService.deleteMovieById(id);
  if (!movie) {
    throw new BadRequestError("No movie with this id");
  }
  return movie;
})); 


movieRouter.get("/:id/count-of-likes", requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const likes = await movieService.countOfLikes(id);
  return { likes };
}));

movieRouter.patch('/:id', authMiddleware, requestHandler(async (req,res) => {
  const {id} = IdZodSchema.parse(req.params);
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }

  const { title, release_date, description, budget, stars, director, language, country_of_origin } = PostZodSchema.parse(req.body);
  if (!title || !release_date || !description || !budget  || !stars || !director || !language || !country_of_origin){
    throw new NotEnoughParametersError("Error in parameters!");
  }

  const numberBudget = Number(budget);
  const movie = await movieService.editMovieById(id, {title, description, budget: numberBudget, stars, director, language, country:country_of_origin, release_date});
  
  if (!movie) {
      throw new NotFoundError(`There is no movie with id: ${id}`);
  }

  return movieTransformer.transform(movie);
}));

movieRouter.get("/:id", requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);

  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }

  const movie = await movieService.findMovie(id);
 
  if (!movie) {
     throw new BadRequestError("No movie with this id!");
    }
  return movieTransformer.transform(movie);;
})); 
movieRouter.get('/:id/comment-count', requestHandler(async(req,res) =>{
  const id = req.params;
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const numberId = Number(id.id);
  const count = await commentService.countOfCommentsOfMovie(numberId);
  return count;
}));




export {movieRouter};