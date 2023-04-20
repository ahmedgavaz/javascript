import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginForm } from "../pages/Login";
import { MovieLibrary } from "../pages/MoviesLibrary";
import { PrivateOutlet, PublicOutlet } from './Outlet';
import './App.css'
import { HomePage } from '../pages/HomePage';
import { NewMoviePage } from '../pages/NewMovie';
import { CurrentUserProvider } from '../contexts/CurrentUserContext';

export function App(){
   return (
   <CurrentUserProvider>
      <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<HomePage/>}/>
               <Route path="/login" element={<PublicOutlet />}>
                  <Route path="/login" element={<LoginForm/>}/>
               </Route>
               <Route path="/" element={<PrivateOutlet />}>
                  <Route path="/movies" element={<MovieLibrary/>}/>
                  <Route path="/movies/:id" element={<MovieLibrary/>}/>
                  <Route path="/movies/new" element={<NewMoviePage />} />
               </Route>
               <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
         </BrowserRouter>
      <Footer/>
   </CurrentUserProvider>
   )
}
