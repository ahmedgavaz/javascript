import { NotFoundMovieError, UserAlreadyExistError } from "../../src/errors"
import { UserModel } from "../../src/models/user-model"
import { CommentService } from "../../src/services/comment-service"
import { UserService } from "../../src/services/user-service"
import { createComment, createMovie, createUser } from "../support/factories"

describe('UserService', () => {
  describe('countOfCommentsOfMovie', () => {
    it('returns count of comments of a movie when there are comments', async () => {
      const comment = createComment();
      const service = new CommentService();
      const count = await service.countOfCommentsOfMovie((await comment).movie_id);
      expect(count).toEqual({"count":"1"})
    })
    it('returns 0 comments when there are comments', async () => {
      const movie = createMovie();
      const service = new CommentService();
      const count = await service.countOfCommentsOfMovie((await movie).id);
      expect(count).toEqual({"count":"0"})
    })
    it('throws error when we search comments for movie which is not in database', async () => {
      const id = -4;
      const service = new CommentService();
      await expect(service.countOfCommentsOfMovie(id)).rejects.toThrow(NotFoundMovieError);
    })
  })
  describe('countOfCommentsOfMovie', () => {
    it('returns the average rating of a movie', async () => {
      const comment = await createComment({ rating: 4 });
      const service = new CommentService();
      const rating = await service.getAverageRatingOfMovie(comment.movie_id);
      expect(rating).toEqual(4);
    })    
    it('throws error when we search rating for movie which is not in database', async () => {
      const id = -4;
      const service = new CommentService();
      await expect(service.getAverageRatingOfMovie(id)).rejects.toThrow(NotFoundMovieError);
    })
  })
  })

