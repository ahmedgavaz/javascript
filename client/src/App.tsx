import React from "react";
import  classes from "./App.module.css";
import { MovieLibrary } from "./MoviesLibrary";

export function App(){
   return (
   <>
    <h1 className={classes.header}>Movie Library </h1>
  <MovieLibrary/>
  </>
   )
}