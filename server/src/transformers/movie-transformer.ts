import { MovieModel } from "../models/movie-model";

 export class MovieTransformer {
    transform(movie: MovieModel) {
    return {
        title: movie.title,
        release_date: movie.release_date,
        description: movie.description,
        budget: movie.budget,
        stars: movie.stars,
        director: movie.director,
        language: movie.language,
        country_of_origin: movie.country_of_origin,
    };
}
    transformArray(movie: MovieModel[]){
        return movie.map(movie=>({        title: movie.title,
            release_date: movie.release_date,
            description: movie.description,
            budget: movie.budget,
            stars: movie.stars,
            director: movie.director,
            language: movie.language,
            country_of_origin: movie.country_of_origin}))
        ;
    }
}
