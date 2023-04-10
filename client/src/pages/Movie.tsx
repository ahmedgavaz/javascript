import { useState } from "react";
import { useParams } from "react-router"
import { Movie } from "../components/Movie";
import { useAsync } from "../hooks/useAsync";
import { movieService } from "../services/movies";

export  function MoviePage(){
const params = useParams();
const [movie,setMovie] = useState<Movie>();

useAsync(()=> movieService.loadMovie(Number(params.id)),setMovie)

    return <div>
        Hello  for movie
        {movie?.title}
        {movie?.description}
    </div>
}
