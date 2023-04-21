import { CommentModel } from "../models/comment-model";

export class CommentTransformer {
    transform(comment: CommentModel) {
      return {
        text: comment.text,
        rating: comment.rating,
        published_on: comment.published_on,
        movie: comment.movie?.title
      };
    }
    transformArray(comment: CommentModel[]) {
        return comment.map(comment => ({
            text: comment.text,
            rating: comment.rating,
            published_on: comment.published_on,
            movie: comment.movie?.title
          }));
      }
  }
  