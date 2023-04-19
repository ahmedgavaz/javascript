import { Navigate, useNavigate } from "react-router";
import { authService} from "../services/auth";
import { UserInfo } from "../services/user-info-storage";
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
     <Button className={classes.button} onClick={() => (window.location.href = "http://127.0.0.1:3000/")}>Movie Library</Button>
     <ThemeSelector />
     <Button className={classes.menu} onClick={() => { window.location.href = "http://127.0.0.1:3000/movies" }}>See movie collection</Button>
     <Button className={classes.menu} onClick={() => { window.location.href = "http://127.0.0.1:3000/movies/new" }}>Create new movie</Button>
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

  function redirectToPage() {
    window.location.href = "http://www.google.com";
  }
   