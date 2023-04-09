import React, { useCallback, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { Movie, MovieTitle } from "./Movie";
import classes from "./MoviesLibrary.module.css";
import { movieService } from "../services/movies";
import { Footer } from "./Footer";
import { useSearchParams } from "react-router-dom";

export function MovieLibrary() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(searchParams.get("view")==='grid');

  useAsync(() => movieService.getAllMovies(), setMovies);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onViewChange = useCallback(()=>{
    setIsGrid((isGrid)=>!isGrid);

    searchParams.set("view",isGrid ? "list" : "grid");

    setSearchParams(searchParams);
  },[searchParams,setSearchParams])

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
      <button className={classes.button} onClick={onViewChange}>
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

    </>
  );
}
