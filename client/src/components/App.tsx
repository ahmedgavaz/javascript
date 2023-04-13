import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MoviePage } from '../pages/Movie';
import { authService, UserInfo } from '../services/auth';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginForm } from "../pages/Login";
import { MovieLibrary } from "./MoviesLibrary";
import { PrivateOutlet, PublicOutlet } from './Outlet';
import classes from './App.css'

export function App(){
  const [user, setUser] = useState<UserInfo | null>(authService.getSavedUser());

   useEffect(()=>{
      authService.setHandler(setUser);
      return()=>{
      authService.setHandler(null);
      }
   },[]);
   
   return (
   <div>
   <Header user={user}/>
   <BrowserRouter>
   <Routes>
      
      <Route path="/" element={<h1>Hello to my movie project!</h1>}/>
      <Route path="/login" element={<PublicOutlet user={user}/>}>
         <Route path="/login" element={<LoginForm/>}/>
      </Route>
      <Route path="/" element={<PrivateOutlet user={user}/>}>
         <Route path="/movies" element={<MovieLibrary/>}/>
         <Route path="/movies/:id" element={<MovieLibrary/>}/>
      </Route>
     
      <Route path="*" element={<Navigate to="/" />}/>
   </Routes>
  </BrowserRouter>
  <Footer/>
  </div>
   )
}
