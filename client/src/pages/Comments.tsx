import { FormEvent, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { FormLayout } from "../layouts/FormLayout";
import classes from './Comments.module.css'
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useNavigate } from "react-router";
import { InputError } from "../services/http";
import { fieldErrors } from "../lib/fieldErrors";
import { movieService } from "../services/movies";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export function NewCommentPage() {
  const movieId = JSON.parse(localStorage.getItem('movie') as string);
  const movieTitle = movieId.title;
  const user = useCurrentUser()
  const [input, setInput] = useState({
    text:"",
    rating:"",
  })

  const navigate = useNavigate();

  const { trigger: createMovie, loading, error } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault()

    if (!user || !user.id){
      return
    }
    const movie = await movieService.getByTitle(movieId.title);
    await movieService.createComment({
      text: input.text ,
      rating:Number(input.rating) ? Number(input.rating) : -1,
      published_on: new Date(),
      user_id:Number(user.id),
      movie_id:Number(movie.id)
    })    
    localStorage.removeItem('movie');

    navigate('/movies')
  })

  return (
    <FormLayout>
      <h3>Add comment about the movie {movieTitle}:</h3>

      <form className={classes.form} onSubmit={createMovie}>
        <TextInput
          placeholder="Text"
          multiline
          errors={fieldErrors(error, 'text')}
          value={input.text}
          onChange={(value) => setInput({ ...input, text: value })} />

        <TextInput
          placeholder="Rating"
          type="number"
          errors={fieldErrors(error, 'rating')}
          value={input.rating}
          onChange={(value) => setInput({ ...input, rating: value })} />

        {error instanceof InputError && error.formErrors.length > 0 && (
          <span>{error.formErrors.join(', ')}</span>
        )}
        <Button
          type="submit"
          disabled={loading} >
          {loading ? <>Loading...</> : <>Create</>}
        </Button>
      </form>
    </FormLayout>
  )
}
