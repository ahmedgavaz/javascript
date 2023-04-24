import { Model } from "objection";
import { BaseModel } from "./base-model";
import { UserModel } from './user-model';
import { MovieModel } from './movie-model';

class LikeModel extends BaseModel{
    static readonly tableName = 'likes';

    user_id!: number;
    movie_id!: number;
    created_at!:Date;
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

export { LikeModel };