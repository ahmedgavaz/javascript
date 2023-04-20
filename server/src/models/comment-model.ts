import { Model } from "objection";
import { BaseModel } from "./base-model";
import { UserModel } from './user-model';
import { MovieModel } from './movie-model';

class CommentModel extends BaseModel{
    static readonly tableName = 'comments';

    text!: string;
    rating!: number;
    published_on!:Date;
    user_id!:number;
    movie_id!:number;
    creator?:UserModel;
    movie?:MovieModel;

    static relationMappings = {
        creator: {
          relation: Model.BelongsToOneRelation,
          modelClass: UserModel,
          join: {
            from: 'comments.user_id',
            to: 'users.id'
          }
        },
        movie: {
            relation: Model.BelongsToOneRelation,
            modelClass: MovieModel,
            join: {
              from: 'comments.movie_id',
              to: 'movies.id'
            }
          }
      };
    
}
export { CommentModel };