import { useState } from "react";
import classes from "./Login.module.css"

export function LoginForm() {
    const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    return (
        <>
            <h1 className={classes.title}>Login</h1>
             <form className={classes.form}>
             <input 
                className={classes.search}
                value={username}
                onChange={(e)=> setUsername(e.target.value)}></input>
            <input
            className={classes.search}>                
            </input>
            <button type="submit">Login</button>
        </form>
      </>
    );
}  