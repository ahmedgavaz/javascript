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

export function NewMoviePage() {
  const [input, setInput] = useState({
    title:"",
    country:"",
    releaseDate:"",
    budget:"",
    director:"",
    stars:"",
    description:"",
    language:""
  })

  const navigate = useNavigate()

  const { trigger: createMovie, loading, error } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault()

    await movieService.create({
      title: input.title,
      country:input.country,
      release_date:new Date(input.releaseDate),
      budget:Number(input.budget),
      director:input.director,
      stars:input.stars,
      description:input.description,
      language:input.language ? input.language : undefined
    })

    navigate('/movies')
  })

  return (
    <FormLayout>
      <h1>Create new movie:</h1>

      <form className={classes.form} onSubmit={createMovie}>
        <TextInput
          placeholder="Title"
          errors={fieldErrors(error, 'title')}
          value={input.title}
          onChange={(value) => setInput({ ...input, title: value })} />

        <TextInput
          placeholder="Country"
          errors={fieldErrors(error, 'country')}
          value={input.country}
          onChange={(value) => setInput({ ...input, country: value })} />

        <TextInput
          placeholder="Release date"
          type="date"
          errors={fieldErrors(error, 'release date')}
          value={input.releaseDate}
          onChange={(value) => setInput({ ...input, releaseDate: value })} />

        <TextInput
          placeholder="Budget"
          type="number"
          errors={fieldErrors(error, 'budger')}
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
        <h1></h1>
        <Button
          type="submit"
          disabled={loading}>
          {loading ? <>Loading...</> : <>Create</>}
        </Button>
      </form>
    </FormLayout>
  )
}
