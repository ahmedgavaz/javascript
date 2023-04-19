import { Model } from "objection";
import { BaseModel } from "./base-model";
import {Knex, knex} from 'knex';
import knexConfig from "../../knexfile";
import { UserModel } from "./user-model";

class MovieModel extends BaseModel{
    static readonly tableName = 'movies';

    title!: string
    release_date!: Date;
    description!: string;
    budget!:number;
    stars!:string;
    director!: string;
    language!:string;
    country_of_origin!:string;
    creatorId!:number;
    
    static relationMappings = {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'movies.creatorId',
          to: 'users.id'
        }
      },
      likedBy: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: 'movies.id',
          through: {
            from: 'likes.movie_id',
            to: 'likes.user_id'
          },
          to: 'users.id'
        }
      }
    };
}

export { MovieModel };