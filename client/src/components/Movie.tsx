import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { FormLayout } from "../layouts/FormLayout";
import { fieldErrors } from "../lib/fieldErrors";
import { NewCommentPage } from "../pages/Comment";
import { InputError } from "../services/http";
import { movieService } from "../services/movies";
import { Button } from "./Button";
import classes from "./Movie.module.css"
import { TextInput } from "./TextInput";

export interface MovieInt{
    id:number;
    title: string;
    release_date: string;
    description: string;
    budget:number;
    stars:string;
    director: string;
    language:string;
    country_of_origin:string;
}

export interface MovieProps{
    movie:MovieInt;
}

export function Movie({movie}:MovieProps){
    const { data:rating, loading, error, trigger, perform } = useAsyncAction(async (query:number) => {
        console.log("ASSA")
        const result = await movieService.getAverageRating(movie.id);
        return result;
      });

      
    return (
        <div>
            <h2 className={classes.elements}>Name: {movie.title}</h2>
            <ul className={classes.elements}>Rating: {rating}</ul>
            <ul className={classes.elements}>Release date: {movie.release_date}</ul>
            <ul className={classes.elements}>Description: {movie.description}</ul>
            <ul className={classes.elements}>Budget: {movie.budget}</ul>
            <ul className={classes.elements}>Stars: {movie.stars}</ul>
            <ul className={classes.elements}>Director: {movie.director}</ul>
            <ul className={classes.elements}>Language: {movie.language}</ul>
            <ul className={classes.elements}>Country of origin: {movie.country_of_origin}</ul>
            <Button className={classes.menu} onClick={() => {
            localStorage.setItem('movie', JSON.stringify(movie));
            window.location.href = "http://127.0.0.1:3000/new-comment"
            }
                }>Add comment</Button>
            <Button className={classes.menu} onClick={() => { window.location.href = "http://127.0.0.1:3000/" }}>See comments</Button>
     
        </div>
    );
}

export function MovieTitle({movie}:MovieProps){
    return (
        <div>
            <h2 className={classes.elements}>Name: {movie.title}</h2>
        </div>
    );
}