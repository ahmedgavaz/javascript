//import { writeFileSync} from 'fs';
import * as dotenv from 'dotenv';
import { Client } from 'pg';
import {Knex, knex} from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';
import { MovieService } from './services/movie-service';
dotenv.config();
import express, {json, Router} from 'express';
import { userRouter } from './routers/users';
import { movieRouter } from './routers/movies';
import { UserService } from './services/user-service';
import { CommentService } from './services/comment-service';
import { commentRouter } from './routers/comments';
import cors from 'cors'
import { config } from './config';

const movieService = new MovieService();

const userService = new UserService();

const knexClient = knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

const port = config.get("db.port");

app.use(json());

app.use(cors());

app.use("/users",userRouter);
app.use("/movies",movieRouter);
app.use("/comments",commentRouter);

app.listen(port);

console.log('Server started on port',port);
