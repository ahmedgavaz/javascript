import { FormEvent, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { FormLayout } from "../layouts/FormLayout";
import classes from './NewMovie.module.css'
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useNavigate } from "react-router";
import { InputError } from "../services/http";
import { fieldErrors } from "../lib/fieldErrors";
import { movieService } from "../services/movies";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { MovieInt } from "../components/Movie";
import { title } from "process";

export function NewCommentPage() {
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
    const movieId = JSON.parse(localStorage.getItem('movie') as string);
    const movie = await movieService.getByTitle(movieId.title);

    await movieService.createComment({
      text: input.text ,
      rating:Number(input.rating) ? Number(input.rating) : -1,
      published_on: new Date(),
      user_id:Number(user.id),
      movie_id:Number(movie.id)
    })    
    localStorage.removeItem('movie');

    navigate('/')
  })

  return (
    <FormLayout>
      <h1>Create new movie:</h1>

      <form className={classes.form} onSubmit={createMovie}>
        <TextInput
          placeholder="Text"
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
