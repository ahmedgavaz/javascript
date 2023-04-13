import React, { useCallback, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { Movie, MovieTitle } from "./Movie";
import classes from "./MoviesLibrary.module.css";
import { movieService } from "../services/movies";
import { Footer } from "./Footer";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export function MovieLibrary() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(searchParams.get("view")==='grid');
  const [searchedFor, setSearchedFor] = useState('');

  //useAsync(() => movieService.search(searchedFor), setMovies, [searchedFor]);

  useAsync(() => movieService.getAllMovies(), setMovies,[]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    params.set("view", isGrid ? "grid" : "list");
    setSearchParams(params);
  }, [searchQuery, isGrid, setSearchParams]);
  

  const filteredMovies = movies;
  
  const onViewChange = useCallback(()=>{
    setIsGrid((isGrid)=>!isGrid);

    searchParams.set("view",isGrid ? "list" : "grid");

    setSearchParams(searchParams);
  },[searchParams,setSearchParams])

  return (
    <>
      <input
       className={classes.search}
       type="text"
       placeholder="Search movies..."
       value={searchQuery}
       onChange={(event) => {
       setSearchedFor(event.target.value);
       setSearchQuery(event.target.value);
        }}
      />
      <Button variant = "secondary" onClick={onViewChange}>
        Change view
      </Button>
      <Button
        variant = "secondary"
        onClick={() => setExpanded(!isExpanded)}
      >
        {isExpanded ? "Unexpand" : "Expand"}
      </Button>
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
