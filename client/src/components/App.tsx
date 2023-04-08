import React, { useState } from "react";
import  classes from "./App.module.css";
import { Header } from "./Header";
import { LoginForm } from "./Login";
import { MovieLibrary } from "./MoviesLibrary";

export function App(){
   const [user,setUser] = useState<{username:string} | null>(null);
   return (
   <>
   <div className={classes.body}>
   <Header user = {{username:"astfd"}}/>
  <MovieLibrary/>
  <LoginForm/>
  </div>
  </>
   )
}