import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MoviePage } from '../pages/Movie';
import { authService, User } from '../services/auth';
import  classes from "./App.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginForm } from "./Login";
import { MovieLibrary } from "./MoviesLibrary";
import { PrivateOutlet } from './PrivateOutlet';

export function App(){
   /*const [user, setUser] = useState<User | null>(authService.getSavedUser());

   useEffect(()=>{
      authService.setHandler(setUser);
      return()=>{
      authService.setHandler(null);
      }
   },[]);
   
   Na prazniq

   */
   return (
   <div className={classes.body}>
   <Header user={{username:"Fd"}}/>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<h1>Hello to my movie project!</h1>}/>
      <Route path="/login" element={<LoginForm/>}/>
      {/*<Route path="/" element={<PrivateOutlet user={user}/>}></Route>*/}
      <Route path="/movies" element={<MovieLibrary/>}/>
      <Route path="/movies/:id" element={<MoviePage/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
   </Routes>
  </BrowserRouter>
  <Footer/>
  </div>
   )
}
