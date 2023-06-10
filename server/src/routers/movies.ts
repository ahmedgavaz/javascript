import { Router } from "express";
import { BadRequestError, NotEnoughParametersError, NotFoundError } from "../errors";
import { authMiddleware, userFromLocals } from "../middlewares/auth";
import { requestHandler } from "../middlewares/request-handler";
import { z } from "zod";
import { MovieService } from "../services/movie-service";
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
  title:z.string().nonempty(),
  country_of_origin:z.string().nonempty(),
  release_date:z.date().refine((value) => value !== undefined, { message: 'Release date cannot be empty' }),
  budget:z.number().nonnegative(),
  director:z.string().nonempty(),
  stars:z.string().nonempty(),
  description:z.string().nonempty(),
  language:z.string().nonempty()
})


const SizePageZodSchema = z.object({
  size:z.coerce.number(),
  page:z.coerce.number()
})

const IdZodSchema = z.object({
  id:z.coerce.number()
})

movieRouter.get('',authMiddleware, requestHandler(async(req,res) =>{
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

movieRouter.get("/get-id", requestHandler(async (req, res) => {
const title = CriteriaZodSchema.parse(req.query)

if (!title.title){
  return
}
  const movie = await movieService.findMovieByTitle(title.title);

  if (!movie) {
    throw new NotFoundError('not found movie with these parameter/s!');
  }
  return movie;
}));


movieRouter.post('/',authMiddleware, requestHandler(async (req, res) => {
    const input = req.body;
  
    const request = PostZodSchema.parse({ title: input.title,
      country_of_origin:input.countryOfOrigin,
      release_date:new Date(input.release_date),
      budget:input.budget,
      director:input.director,
      stars:input.stars,
      description:input.description,
      language:input.language});
    const user = userFromLocals(res);

    const isExist = await movieService.findMovieByTitle(request.title);
    if (isExist){
      throw new BadRequestError("Movie already exists!");
    }
    
    const movie= await movieService.create(request, user.id)

    return { result: movieTransformer.transform(movie) };
}));

movieRouter.delete("/:id", authMiddleware, requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);

  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const movie = await movieService.findMovie(id)
  await movieService.deleteMovieById(id);
  return movie;
})); 


movieRouter.get("/:id/count-of-likes", requestHandler(async(req,res) =>{
  const {id} = IdZodSchema.parse(req.params);
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const likes = await movieService.countOfLikes(id);
  return likes[0];
}));

movieRouter.patch('/:id', authMiddleware, requestHandler(async (req,res) => {
  const {id} = IdZodSchema.parse(req.params);
  if (!id){
    throw new NotEnoughParametersError("Error in parameters!");
  }
  const input = req.body;
  
  const request = PostZodSchema.parse({ 
    title: input.title,
    country_of_origin:input.countryOfOrigin,
    release_date:new Date(input.release_date),
    budget:input.budget,
    director:input.director,
    stars:input.stars,
    description:input.description,
    language:input.language});

  const movie = await movieService.editMovieById(id, request);
  
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