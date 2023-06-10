import { useCallback, useEffect, useState } from "react";
import classes from "./MoviesLibrary.module.css";
import { movieService } from "../services/movies";
import { useSearchParams } from "react-router-dom";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { Movie, MovieTitle } from "../components/Movie";
import { Button } from "../components/Button";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
 
export function MovieLibrary() {
  localStorage.setItem('isComment', JSON.stringify(false));
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { preferences: { theme, isGrid }, setPreferences } = useUserPreferences()
 
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
    setPreferences({ isGrid: !isGrid })
 
    searchParams.set("view",isGrid ? "list" : "grid");
 
    setSearchParams(searchParams);
  },[searchParams,setSearchParams])
 
  return (
    <div>
      <h1>Search movies:</h1>
      <input
        className={classes.search}
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
          trigger(event.target.value);
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
              {isExpanded ? <Movie movie={movie}/> : <MovieTitle movie={movie} />}
            </div>
          ))
        ) : (
          searchQuery && <div className={classes.noMovies}>No movies found</div>
        )}
      </div>
    </div>
  );
  
}
