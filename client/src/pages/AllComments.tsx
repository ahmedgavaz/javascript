import { useEffect} from "react";
import classes from "./AllComments.module.css";
import { movieService } from "../services/movies";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { Movie} from "../components/Movie";
import { Comment, CommentInt } from "../components/Comment";
import { Button } from "../components/Button";

 
export function AllComents() {
  localStorage.setItem('isComment', JSON.stringify(true));
  const movieId = JSON.parse(localStorage.getItem('movie') as string);

  const { data:comments, loading, error, trigger, perform } = useAsyncAction(async () => {
    const movie = await movieService.getByTitle(movieId.title);
    const result = await movieService.getComments(movie.id);
    return result;
  });

  useEffect(() => {
    trigger();
  }, []);
 console.log(comments)

  return (
    <div className={classes.body}>
      <div>
        <div className={classes.element}>
           <Movie movie={movieId} />
        </div>
        <div>
         {comments && comments.length>0 ? (
            comments.map((comment:CommentInt) => (
              <div className={classes.comment} key={comment.published_on}>
                 <Comment comment={comment}/>
              </div>
          ))
        ) : <h1>No comment for this movie!</h1>}
        </div>
      </div>
      <Button className={classes.button}
            onClick={() =>{
              window.location.href = "http://127.0.0.1:3000/movies"
            }}>Return</Button>
    </div>
  );
  
}
