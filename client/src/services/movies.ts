import { MovieInt } from "../components/Movie";
import { HttpService } from "./http";



interface GetMoviesResponse {
  movies: MovieInt[];
  total: number;
}

export interface MovieInput {
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
  creatorId:number,
  movieId:number
}

interface Mov{
  input:string
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
  
  async loadMovie(movieId: number) {
    const movies = await this.getAllMovies();
    return movies.find((movie:MovieInt) => movie.id === movieId);
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

  async createComment(input: CommentInput) {
    const movie= await this.http.post<MovieInt>('/comments', {
      body: input
    })
    return movie;
  }

}
  
  export const movieService = new MoviesService();