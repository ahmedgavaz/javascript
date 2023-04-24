import { useEffect } from "react";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { movieService } from "../services/movies";
import { Button } from "./Button";
import classes from "./Movie.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

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
    creator_id?:number;
}

export interface MovieProps{
    movie:MovieInt;
}

export function Movie({movie}:MovieProps){
    const loggedUser = useCurrentUser();
    const isComment = JSON.parse(localStorage.getItem('isComment') as string);
    const { data:rating, loading, error, trigger, perform } = useAsyncAction(async () => {
        const movieWithId = await movieService.getByTitle(movie.title);
        const id = movieWithId.id
        const result = await movieService.getAverageRating(id);
        return result;
      });

      const { data:comments, loading:loadin1, error:error1, trigger:trigger1, perform:perform1 } = useAsyncAction(async () => {
        const movieWithId = await movieService.getByTitle(movie.title);
        const id = movieWithId.id
        const result = await movieService.getCommentsCount(id);
        return result;
      });


      const { data:creatorId, loading:loadin2, error:error2, trigger:trigger2, perform:perform2 } = useAsyncAction(async () => {
        const creatorId = await movieService.getCreator(movie.title);
        return creatorId;
      });

      useEffect(() => {
        trigger();
        trigger1();
        trigger2();
    }, []);

    const creator =creatorId;

    return (
        <div className={classes.border}>
            <h2 className={classes.elements}>Name: {movie.title}</h2>
            <ul className={classes.elements}>Rating: {rating}</ul>
            <ul className={classes.elements}>Release date: {movie.release_date}</ul>
            <ul className={classes.elements}>Description: {movie.description}</ul>
            <ul className={classes.elements}>Budget in $: {movie.budget}</ul>
            <ul className={classes.elements}>Stars: {movie.stars}</ul>
            <ul className={classes.elements}>Director: {movie.director}</ul>
            <ul className={classes.elements}>Language: {movie.language}</ul>
            <ul className={classes.elements}>Country of origin: {movie.country_of_origin}</ul>
                {!isComment && loggedUser?.id==creator && (
                <div className={classes.rows}>
                    <Button className={classes.menu} onClick={() => {
                        localStorage.setItem('movie', JSON.stringify(movie));
                        window.location.href = "http://127.0.0.1:3000/new-comment"
                     }}>Add comment</Button>
                    <Button className={classes.menu} onClick={() => {
                        localStorage.setItem('movie', JSON.stringify(movie));
                        window.location.href = "http://127.0.0.1:3000/edit-movie"
                        }}>Edit movie</Button>
                    <Button className={classes.menu} onClick={() => {
                        localStorage.setItem('movie', JSON.stringify(movie));
                        window.location.href = "http://127.0.0.1:3000/all-comments"}}>
                        See comments ({comments})
                    </Button>
                    </div>
            )}
            {isComment || loggedUser?.id!==creator && (
                <div className={classes.rowsTwo}>
                    <Button className={classes.menu} onClick={() => {
                        localStorage.setItem('movie', JSON.stringify(movie));
                        window.location.href = "http://127.0.0.1:3000/new-comment"
                     }}>Add comment</Button>
                    <Button className={classes.menu} onClick={() => {
                        localStorage.setItem('movie', JSON.stringify(movie));
                        window.location.href = "http://127.0.0.1:3000/edit-movie"
                        }}>Edit movie</Button>
                    </div>
            )}
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

