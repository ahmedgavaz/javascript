import classes from "./Movie.module.css"

export interface MovieInt{
    id:number;
    title: string;
    releaseDate: string;
    description: string;
    budget:number;
    stars:string;
    director: string;
    language:string;
    countryOfOrigin:string;
}

interface MovieProps{
    movie:MovieInt;
}

export function Movie({movie}:MovieProps){
    return (
        <div>
            <h2 className={classes.elements}>Name: {movie.title}</h2>
            <ul className={classes.elements}>Release date: {movie.releaseDate}</ul>
            <ul className={classes.elements}>Description: {movie.description}</ul>
            <ul className={classes.elements}>Budget: {movie.budget}</ul>
            <ul className={classes.elements}>Stars: {movie.stars}</ul>
            <ul className={classes.elements}>Director: {movie.director}</ul>
            <ul className={classes.elements}>Language: {movie.language}</ul>
            <ul className={classes.elements}>Country of origin: {movie.countryOfOrigin}</ul>
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