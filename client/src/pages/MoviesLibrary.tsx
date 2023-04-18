import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import classes from "./MoviesLibrary.module.css";
import { movieService } from "../services/movies";
import { useSearchParams } from "react-router-dom";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { Movie, MovieTitle } from "../components/Movie";
import { Button } from "../components/Button";
 
export function MovieLibrary() {
 
  //const [movies, setMovies] = useState<Movie[]>([]);
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(searchParams.get("view")==='grid');
 
  //useAsync(() => movieService.search(searchedFor), setMovies, [searchedFor]);
 
  //useAsync(() => movieService.getAllMovies(), setMovies,[]);
 
  const { data:movies, loading, error, trigger, perform } = useAsyncAction(async (query:string) => {
    const result = await movieService.search(query);
    return result;
  });
 
 
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    params.set("view", isGrid ? "grid" : "list");
    setSearchParams(params);
  }, [searchQuery, isGrid, setSearchParams]);
 
  const filteredMovies =
  searchQuery === ""
    ? movies
    : movies?.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
          setSearchQuery(event.target.value);
          perform(event.target.value);
        }}
      />
      {filteredMovies && filteredMovies.length > 0 && (
        <>
          <Button variant="secondary" onClick={onViewChange}>
            Change view
          </Button>
          <Button
            variant="secondary"
            onClick={() => setExpanded(!isExpanded)}
          >
            {isExpanded ? "Unexpand" : "Expand"}
          </Button>
        </>
      )}
      <div className={isGrid ? classes.grid : classes.list}>
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className={classes.element} key={movie.title}>
              {isExpanded ? <Movie movie={movie} /> : <MovieTitle movie={movie} />}
            </div>
          ))
        ) : (
          searchQuery && <div className={classes.noMovies}>No movies found</div>
        )}
      </div>
    </>
  );
  
}
