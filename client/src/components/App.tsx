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
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { SigupForm } from '../pages/Signup';
import { NewCommentPage } from '../pages/Comment';

export function App(){
   return (
   <CurrentUserProvider>
      <UserPreferencesProvider>
         <Header />
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/login" element={<PublicOutlet />}>
                     <Route path="/login" element={<LoginForm/>}/>
                  </Route>
                  <Route path="/signup" element={<PublicOutlet />}>
                     <Route path="/signup" element={<SigupForm/>}/>
                  </Route>
                  <Route path="/" element={<PrivateOutlet />}>
                     <Route path="/movies" element={<MovieLibrary/>}/>
                     <Route path="/movies/:id" element={<MovieLibrary/>}/>
                     <Route path="/movies/new" element={<NewMoviePage />} />
                     <Route path="/new-comment" element={<NewCommentPage />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />}/>
               </Routes>
            </BrowserRouter>
         <Footer/>
      </UserPreferencesProvider>
   </CurrentUserProvider>
   )
}