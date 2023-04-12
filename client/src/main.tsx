import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './components/App'
import './components/index.css'
import { MovieLibrary } from './components/MoviesLibrary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
 <App />
);