import { useState, FormEvent } from "react";
import classes from "./Login.module.css";
import { InvalidCredentialsError, authService } from "../services/auth";
import { useLocation, useNavigate } from "react-router";
import { Button } from '../components/Button';
import { TextInput } from "../components/Input";


export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<unknown>();

  const location = useLocation();
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const locationFrom = location.state?.locationFrom;

    try {
      await authService.login(username, password);

      setUsername('');
      setPassword('');

      navigate(locationFrom ?? '/');
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className={classes.root}>
      <h1>Login</h1>

      <form
        className={classes.form}
        onSubmit={onSubmit}>
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

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

function messageForError(error: unknown) {
  if (error instanceof InvalidCredentialsError) {
    return 'Invalid email or password'
  }

  return 'Something went wrong'
}
