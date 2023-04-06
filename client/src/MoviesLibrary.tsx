import React, { useEffect, useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { Movie } from "./Movie";
import classes from "./MoviesLibrary.module.css"
import { movieService } from "./services/movies";

export function MovieLibrary(){
  const [isGrid, setIsGrid] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useAsync(() => movieService.getAllMovies(),setMovies);

  return (
    <>
    <button className={classes.button} onClick={()=> setIsGrid(!isGrid)}>Chane view</button>
    <div className={isGrid ? classes.grid : classes.list}>
      {movies.map((movie) => (
        <div className={classes.element} key={movie.title}>
          <Movie movie={movie} />
        </div>
      ))}
    </div>
    <h1 className={classes.footer}>Made by: Ahmed Gavaz</h1>
  </>
  );
}
