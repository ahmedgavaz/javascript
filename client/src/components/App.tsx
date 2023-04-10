import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MoviePage } from '../pages/Movie';
import { authService, User } from '../services/auth';
import { PrivateRoute, PublicRoute } from '../services/Routes';
import  classes from "./App.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginForm } from "./Login";
import { MovieLibrary } from "./MoviesLibrary";
import { PrivateOutlet } from './PrivateOutlet';

export function App(){
  // const [user, setUser] = useState<User | null>(authService.getSavedUser());

  /* useEffect(()=>{
      authService.setHandler(setUser);
      return()=>{
      authService.setHandler(null);
      }
   },[]);*/
   
   return (
   <div className={classes.body}>
   <Header user={{username:"Fd"}}/>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<h1>Hello to my movie project!</h1>}/>
      {/*<PublicRoute path="/login" element={<LoginForm/>}/>*/}
      {/*<Route path="/" element={<PrivateOutlet user={user}/>}></Route>*/}
      {/*<PrivateRoute path="/movies" element={<MovieLibrary/>}/>*/}
      {/*<PrivateRoute path="/movies/:id" element={<MoviePage/>}/>*/}
      <Route path="/movies" element={<MovieLibrary/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
   </Routes>
  </BrowserRouter>
  <Footer/>
  </div>
   )
}
