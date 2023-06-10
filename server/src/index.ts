import * as dotenv from 'dotenv';
import {knex} from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';
dotenv.config();
import express, {json} from 'express';
import { userRouter } from './routers/users';
import { movieRouter } from './routers/movies';
import { commentRouter } from './routers/comments';
import cors from 'cors'
import { config } from './config';

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
