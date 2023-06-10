import { FormEvent, useEffect, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { FormLayout } from "../layouts/FormLayout";
import classes from './NewMovie.module.css'
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useNavigate } from "react-router";
import { InputError } from "../services/http";
import { fieldErrors } from "../lib/fieldErrors";
import { movieService } from "../services/movies";

export function EditMovie() {
  const movieId = JSON.parse(localStorage.getItem('movie') as string);

  const [input, setInput] = useState({
    id:"",
    title:"",
    countryOfOrigin:"",
    releaseDate:"",
    budget:"",
    director:"",
    stars:"",
    description:"",
    language:""
  })

  const navigate = useNavigate();


  const { data:movieData, loading:loadin1, error:error1, trigger:trigger1, perform:perform1 } = useAsyncAction(async () => {
    const movie = await movieService.getByTitle(movieId.title);
    setInput({
      ...input,
      id:movie.id.toString()
    });
    return movie;
  });

  const { trigger: editMovie, loading, error } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault()

    await movieService.editMovie({
      id:Number(input.id),
      title: input.title ,
      countryOfOrigin:input.countryOfOrigin ,
      release_date:input.releaseDate!="" ? new Date(input.releaseDate): undefined,
      budget:Number(input.budget) ? Number(input.budget) : -1,
      director:input.director ,
      stars:input.stars,
      description:input.description,
      language:input.language
    })    
    localStorage.removeItem('movie')
    navigate('/movies')
  })

  const {loading:loadin2, error:error2, trigger:trigger2, perform:perform2 } = useAsyncAction(async () => {
    const movie = await movieService.getByTitle(movieId.title);
    await movieService.deleteMovie(movie.id);
    navigate('/movies')
  });

  useEffect(() => {
    trigger1();
  }, []);

  useEffect(() => {
    if (movieData) {
      setInput({
        ...input,
        title: movieData.title,
        countryOfOrigin: movieData.country_of_origin,
        releaseDate: new Date(movieData.release_date).toISOString().slice(0, 10),
        budget: movieData.budget.toString(),
        director: movieData.director,
        stars: movieData.stars,
        description: movieData.description,
        language: movieData.language
      });
    }
  }, [movieData]);

  return (
    <FormLayout>
      <h2>Edit movie {movieId.title}:</h2>

      <form className={classes.form} onSubmit={editMovie}>
        <TextInput
          placeholder="Title"
          errors={fieldErrors(error, 'title')}
          value={input.title}
          onChange={(value) => setInput({ ...input, title: value })}/>

        <TextInput
          placeholder="Country"
          errors={fieldErrors(error, 'country_of_origin')}
          value={input.countryOfOrigin}
          onChange={(value) => setInput({ ...input, countryOfOrigin: value })} />

        <TextInput
          placeholder="Release date"
          type="date"
          errors={fieldErrors(error, 'release_date')}
          value={input.releaseDate}
          onChange={(value) => setInput({ ...input, releaseDate: value })}/>

        <TextInput
          placeholder="Budget"
          type="number"
          errors={fieldErrors(error, 'budget')}
          value={input.budget}
          onChange={(value) => setInput({ ...input, budget: value })} />

        <TextInput
          placeholder="Director"
          errors={fieldErrors(error, 'director')}
          value={input.director}
          onChange={(value) => setInput({ ...input, director: value })} />

        <TextInput
          placeholder="Stars"
          errors={fieldErrors(error, 'stars')}
          value={input.stars}
          onChange={(value) => setInput({ ...input, stars: value })} />
                 
         <TextInput
          placeholder="Language"
          errors={fieldErrors(error, 'language')}
          value={input.language}
          onChange={(value) => setInput({ ...input, language: value })} />

        <TextInput
          className={classes.description}
          multiline
          placeholder="Description"
          errors={fieldErrors(error, 'description')}
          value={input.description}
          onChange={(value) => setInput({ ...input, description: value })} />

        {error instanceof InputError && error.formErrors.length > 0 && (
          <span>{error.formErrors.join(', ')}</span>
        )}
        {!(error instanceof InputError) && error instanceof Error &&(
         <div className={classes.error}>{(error as Error).message}</div>
        )}

        <Button
          type="submit"
          disabled={loading} >
          {loading ? <>Loading...</> : <>Edit</>}
        </Button>
        <Button
        type="button"
          variant="accent"
          onClick={() =>{
            trigger2();
          }}>
          Delete movie
        </Button>
      </form>
    </FormLayout>
  )
}
