import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginForm } from "../pages/Login";
import { MovieLibrary } from "../pages/MoviesLibrary";
import { PrivateOutlet, PublicOutlet } from './Outlet';
import './App.css'
import { HomePage } from '../pages/HomePage';
import { UserInfo, userInfoStorage } from '../services/user-info-storage';
import { NewMoviePage } from '../pages/NewMovie';

export function App(){
  const [user, setUser] = useState<UserInfo | null>(userInfoStorage.userInfo);

   useEffect(()=>{
      userInfoStorage.setHandler(setUser);
      return()=>{
      userInfoStorage.setHandler(null);
      }
   },[]);
   
   return (
   <div>
   <Header user={user}/>
   <BrowserRouter>
   <Routes>
      
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<PublicOutlet user={user}/>}>
         <Route path="/login" element={<LoginForm/>}/>
      </Route>
      <Route path="/" element={<PrivateOutlet user={user}/>}>
         <Route path="/movies" element={<MovieLibrary/>}/>
         <Route path="/movies/:id" element={<MovieLibrary/>}/>
         <Route path="/movies/new" element={<NewMoviePage />} />
      </Route>
     
      <Route path="*" element={<Navigate to="/" />}/>
   </Routes>
  </BrowserRouter>
  <Footer/>
  </div>
   )
}
