import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { authService } from "../services/auth";
import classes from "./Login.module.css"

export function LoginForm() {
    const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
            <h1 className={classes.title}>Login</h1>
             <form className={classes.form}
             onSubmit={(e)=>{
                e.preventDefault();
                const locationFrom = location.state?.locationFrom
                authService.login({username});
                setUsername("");
                navigate(locationFrom ?? "/");
            }}>
             <input 
                className={classes.search}
                value={username}
                onChange={(e)=> setUsername(e.target.value)}></input>
            <button type="submit" >Login</button>
        </form>
      </>
    );
}  