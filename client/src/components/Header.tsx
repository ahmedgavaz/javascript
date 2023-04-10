import { useNavigate } from "react-router";
import { authService, User } from "../services/auth";
import classes from "./Header.module.css"

interface HeaderProps{
    user: User | null;
}

export function Header({user}:HeaderProps) {
  //const navigate = useNavigate();
    return (
    <div className={classes.header}>
      <h1>Movie Library </h1>
      {user ?(
        <div className={classes.userSection}>
          <h4>{user?.username}</h4>
          <button onClick={()=>{
            authService.logout();
           // navigate("/");
          }
        }>Logout</button>
        </div>
      ):null}
      </div>
    );
  }
   