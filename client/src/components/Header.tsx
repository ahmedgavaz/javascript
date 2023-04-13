import { Navigate, useNavigate } from "react-router";
import { authService, UserInfo } from "../services/auth";
import { Button } from "./Button";
import classes from "./Header.module.css"
import { ThemeSelector } from "./ThemeSelector";

interface HeaderProps{
    user: UserInfo | null;
}

export function Header({user}:HeaderProps) {
  //const navigate = useNavigate();
    return (
    <div className={classes.header}>
      <h1>Movie Library </h1>
      <ThemeSelector />
      {user ?(
        <div className={classes.userSection}>
          <h4>{user?.email}</h4>
          <Button variant="accent" onClick={()=>{
            authService.logout();
            <Navigate to ="/"/>
          }
        }>Logout</Button>
        </div>
      ):null}
      </div>
    );
  }
   