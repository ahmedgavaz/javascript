import { CommentModel } from "../../src/models/comment-model";
import { MovieModel } from "../../src/models/movie-model";
import { UserModel } from "../../src/models/user-model";
import { UserService } from "../../src/services/user-service";

export function createUser(data: Partial<UserModel> = {}) {
  return UserModel.query().insertAndFetch({
    name: 'Maria',
    email: 'maria@gmail.com',
    password: 'asdf',

    ...data
  })
}
export async function createMovie(data: Partial<MovieModel> = {}) {
  const user = await UserModel.query().findOne({ email: 'maria@gmail.com' });
  return MovieModel.query().insertAndFetch({
    title: 'title',
    release_date: new Date('1999-12-12'),
    description: 'description',
    budget:123456,
    stars:'stars',
    director: 'dirsector',
    language:'eng',
    country_of_origin:'USA',
    creatorId:user?.id,
    ...data
  })
}

  export async function createComment(data: Partial<CommentModel> = {}) {
    const user = await UserModel.query().findOne({ email: 'maria@gmail.com' });
    const movie = await createMovie();
    if (!movie){
      throw new Error("Not found movie");
      
    }
    return CommentModel.query().insertAndFetch({
      text: 'text',
      rating:4,
      published_on: new Date('1999-12-12'),
      user_id:user?.id,
      movie_id:movie.id,
      ...data
    }) ?? {};
}