import React, { useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { Movie, MovieTitle } from "./Movie";
import classes from "./MoviesLibrary.module.css";
import { movieService } from "../services/movies";

export function MovieLibrary() {
  const [isGrid, setIsGrid] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useAsync(() => movieService.getAllMovies(), setMovies);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          className={classes.search}
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className={classes.button} onClick={() => setIsGrid(!isGrid)}>
        Change view
      </button>
      <button
        className={classes.button}
        onClick={() => setExpanded(!isExpanded)}
      >
        {isExpanded ? "Unexpand" : "Expand"}
      </button>
      <div className={isGrid ? classes.grid : classes.list}>
        {filteredMovies.map((movie) => (
          <div className={classes.element} key={movie.title}>
            {isExpanded ? <Movie movie={movie} /> : <MovieTitle movie={movie} />}
          </div>
        ))}
      </div>
      <h1 className={classes.footer}>Made by: Ahmed Gavaz</h1>
    </>
  );
}
