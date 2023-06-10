import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { NewCommentPage } from '../pages/Comments';
import { AllComents } from '../pages/AllComments';
import { EditMovie } from '../pages/EditMovie';

export function App(){
   localStorage.setItem('isComment', JSON.stringify(false));
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
                     <Route path="/all-comments" element={<AllComents />} />
                     <Route path="/edit-movie" element={<EditMovie />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />}/>
               </Routes>
            </BrowserRouter>
         <Footer/>
      </UserPreferencesProvider>
   </CurrentUserProvider>
   )
}
