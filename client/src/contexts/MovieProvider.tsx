import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { MovieInt } from "../components/Movie";

const MovieContext = createContext<MovieInt | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movie, setMovie] = useState<MovieInt | undefined>(movieInfoStorage.movieInfo);

  useEffect(() => {
    movieInfoStorage.setHandler(setMovie);

    return () => {
      movieInfoStorage.setHandler(undefined);
    };
  }, []);

  return (
    <MovieContext.Provider value={movie}>{children}</MovieContext.Provider>
  );
}

export function useMovie() {
  return useContext(MovieContext);
}
