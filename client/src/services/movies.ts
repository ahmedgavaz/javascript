import { Movie } from "../components/Movie";

const movies: Movie[] = [
    {
      id:1,
      title: "The Shawshank Redemption",
      releaseDate: "14-09-1994",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      budget: 25000000,
      stars: "Tim Robbins, Morgan Freeman",
      director: "Frank Darabont",
      language: "English",
      countryOfOrigin: "United States"
    },
    {
      id:2,
      title: "The Godfather",
      releaseDate: "24-02-1972",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      budget: 6000000,
      stars: "Marlon Brando, Al Pacino",
      director: "Francis Ford Coppola",
      language: "English",
      countryOfOrigin: "United States"
    },
    {
      id:3,
      title: "The Dark Knight",
      releaseDate: "18-07-2008",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      budget: 185000000,
      stars: "Christian Bale, Heath Ledger",
      director: "Christopher Nolan",
      language: "English",
      countryOfOrigin: "United States"
    },
    {
      id:4,
      title: "Inception",
      releaseDate: "16-06-2010",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      budget: 160000000,
      stars: "Leonardo DiCaprio, Joseph Gordon-Levitt",
      director: "Christopher Nolan",
      language: "English",
      countryOfOrigin: "United States"
    },
    {
      id:5,
      title: "Parasite",
      releaseDate: "30-05-2019",
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      budget: 11400000,
      stars: "Kang-ho Song, Sun-kyun Lee",
      director: "Bong Joon-ho",
      language: "Korean",
      countryOfOrigin: "South Korea"
    }
  ];

class MoviesService {
  getAllMovies() {
    return new Promise<Movie[]>((resolve) => {
      resolve(movies);
    });
  }
  loadMovie(movieId:number) {
    return new Promise<Movie | undefined>((resolve) => {
      resolve(movies.find(({id})=> id ===movieId));
    });
  }

  search(input: string) {
    return new Promise<Movie[]>((resolve) => {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(input.toLowerCase())
      );
      resolve(filteredMovies);
    });
  }

}
  
  export const movieService = new MoviesService();