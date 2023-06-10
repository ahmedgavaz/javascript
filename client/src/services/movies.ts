import { CommentInt } from "../components/Comment";
import { MovieInt } from "../components/Movie";
import { HttpService } from "./http";



interface GetMoviesResponse {
  movies: MovieInt[];
  total: number;
}

interface MoviePatch{
  id:number;
  title: string;
  release_date: string;
  description: string;
  budget:number;
  stars:string;
  director: string;
  language:string;
  country_of_origin:string;
}

export interface MovieInput {
  id?:number,
  title:string,
  countryOfOrigin:string,
  release_date?:Date,
  budget:number,
  director:string,
  stars:string,
  description:string,
  language:string
}

interface CommentInput {
  text:string,
  rating:number,
  published_on:Date,
  user_id:number,
  movie_id:number
}

interface Rating{
  rating:number
}

interface Name{
  name:string
}

interface CommentsCount{
  count:number
}

class MoviesService {
  private http = new HttpService();


  async getAllMovies() {
    const body = await this.http.get<GetMoviesResponse>('/movies');
    const library = body.movies || body; 
    return library;
  }

  async getByTitle(title: string){
    const movie = await this.http.get<MovieInt>('/movies/get-id', {
      query: {title}
    });
    return movie;
  }

  async getCreator(title: string){
    const movie = await this.http.get<MovieInt>('/movies/get-id', {
      query: {title}
    });
    return movie.creator_id;
  }
  
  async loadMovie(movieId: number) {
    const movies = await this.getAllMovies();
    return movies.find((movie:MovieInt) => movie.id === movieId);
  }
  
  async getCommentsCount(movieId: number) {
    const str =""+movieId;
    const commentsCount= await this.http.get<CommentsCount>('/movies/'+str+'/comment-count', {
      query:{str}
    });
    return commentsCount.count;
  }

  async getAverageRating(movieId: number) {
    const str =""+movieId;
    const rating= await this.http.get<Rating>('/comments/'+str+'/average-rating', {
      query:{str}
    });
    return rating.rating.toFixed(1);
  }

  async getComments(movieId: number) {
    const str =""+movieId;
    const comments= await this.http.get<CommentInt>('/movies/'+str+'/comments', {
      query:{str}
    });
    return comments;
  }

  async getUserName(userId: number) {
    const str =""+userId;
    const userName= await this.http.get<Name>('/users/'+str, {
      query:{str}
    });
    return userName;
  }

  async search(input: string) {
    const movies = await this.getAllMovies();
    const filteredMovies = movies.filter((movie:MovieInt) =>
      movie.title.toLowerCase().includes(input.toLowerCase())
    );
    return filteredMovies;
  }  

  async create(input: MovieInput) {
    const movie= await this.http.post<MovieInt>('/movies', {
      body: input
    })
    return movie;
  }

  async editMovie(input: MovieInput) {
    const movie= await this.http.patch<MovieInt>('/movies/'+input.id, {
      body: input
    })
    return movie;
  }

  async deleteMovie(movieId: number) {
    const comment= await this.http.delete<CommentInput>('/comments/'+movieId, {
    });
    const movie= await this.http.delete<MovieInt>('/movies/'+movieId, {
    })
    return movie;
  }

  async createComment(input: CommentInput) {
    const movie= await this.http.post<MovieInt>('/comments', {
      body: input
    })
    return movie;
  }

}
  
  export const movieService = new MoviesService();