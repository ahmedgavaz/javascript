import { useEffect } from "react";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { movieService } from "../services/movies";
import classes from "./Comment.module.css"

export interface CommentInt{
    [x: string]: any;
    text: string;
    rating:number;
    published_on:string;
    user_id:string;
}
export interface CommentProps{
    comment:CommentInt;
}

export function Comment({comment}:CommentProps){

    const { data:author, loading, error, trigger, perform } = useAsyncAction(async () => {
        const result = await movieService.getUserName(Number(comment.user_id));
        return result;
      });

      useEffect(() => {
        trigger();
      }, []);

    return (
        <div className={classes.border}>
            <h2 className={classes.elements}>Author: {author?.name}</h2>
            <ul className={classes.elements}>Published on: {comment.published_on}</ul>
            <ul className={classes.elements}>Rating: {comment.rating}</ul>
            <ul className={classes.elements}>Comment: {comment.text}</ul>
        </div>
    );
}