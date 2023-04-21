import { FormEvent, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { FormLayout } from "../layouts/FormLayout";
import classes from './NewMovie.module.css'
import { useAsyncAction } from "../hooks/useAsyncAction";
import { useNavigate } from "react-router";
import { InputError } from "../services/http";
import { fieldErrors } from "../lib/fieldErrors";
import { userService } from "../services/user";

export function SigupForm() {
  const [input, setInput] = useState({
    name:"",
    age:"",
    email:"",
    password:"",
  })

  const navigate = useNavigate();

  const { trigger: createMovie, loading, error } = useAsyncAction(async (event: FormEvent) => {
    event.preventDefault()

    await userService.create({
      name: input.name ,
      age:Number(input.age),
      email:input.email ,
      password:input.password 
    })    

    navigate('/')
  })
  

  return (
    <FormLayout>
      <h2>Create new account:</h2>

      <form className={classes.form} onSubmit={createMovie}>
        <TextInput
          placeholder="Name"
          errors={fieldErrors(error, 'name')}
          value={input.name}
          onChange={(value) => setInput({ ...input, name: value })} />

        <TextInput
          placeholder="Age"
          type="number"
          errors={fieldErrors(error, 'age')}
          value={input.age}
          onChange={(value) => setInput({ ...input, age: value })} />

        <TextInput
          placeholder="E-mail"
          type="email"
          errors={fieldErrors(error, 'email')}
          value={input.email}
          onChange={(value) => setInput({ ...input, email: value })} />

        <TextInput
          placeholder="Password"
          type="password"
          errors={fieldErrors(error, 'password')}
          value={input.password}
          onChange={(value) => setInput({ ...input, password: value })} />
        
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
