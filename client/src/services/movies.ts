import { Movie } from "../components/Movie";
import { authService, HttpError } from "./auth";
import { HttpService } from "./http";



interface GetMoviesResponse {
  movies: Movie[];
  total: number;
}


class MoviesService {
  private http = new HttpService();


  async getAllMovies() {
    const body = await this.http.get<GetMoviesResponse>('/movies');
    const library = body.movies || body; 
    return library;
  }
  
  async loadMovie(movieId: number) {
    const movies = await this.getAllMovies();
    return movies.find((movie:Movie) => movie.id === movieId);
  }
  

  async search(input: string) {
    const movies = await this.getAllMovies();
    const filteredMovies = movies.filter((movie:Movie) =>
      movie.title.toLowerCase().includes(input.toLowerCase())
    );
    console.log(input);
    return filteredMovies;
  }  
}
  
  export const movieService = new MoviesService();