import { useState, FormEvent } from "react";
import classes from "./Login.module.css";
import { InvalidCredentialsError, authService } from "../services/auth";
import { useLocation, useNavigate } from "react-router";
import { Button } from '../components/Button';
import { TextInput } from "../components/TextInput";
import { useAsyncAction } from "../hooks/useAsyncAction";
import { FormLayout } from "../layouts/FormLayout";

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error, trigger, perform } = useAsyncAction(async (event?: FormEvent) => {
    event?.preventDefault();

    const locationFrom = location.state?.locationFrom;

    const user = await authService.login(username, password);

    setUsername('');
    setPassword('');
    navigate(locationFrom ?? '/');

    return user
  })

  return (
    <FormLayout>
      <h1>Login</h1>

      <form
        className={classes.form}
        onSubmit={trigger}>
        <TextInput
          placeholder="Email"
          type="email"
          value={username}
          onChange={setUsername} />

        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword} />

        {!!error && <span className={classes.errorMessage}>{messageForError(error)}</span>}

        <Button disabled={loading} type="submit">{loading ? <>Loading...</> : <>Login</>}</Button>
      </form>
    </FormLayout>
  );
}

function messageForError(error: unknown) {
  if (error instanceof InvalidCredentialsError) {
    return 'Invalid email or password!'
  }

  return 'Something went wrong!'
}
