import { authService, User } from "../services/auth";
import classes from "./Header.module.css"

interface HeaderProps{
    user: User | null;
}

export function Header({user}:HeaderProps) {
    return (
    <div className={classes.header}>
      <h4>Movie Library </h4>
      {user ?(
        <div className={classes.userSection}>
          <h4>{user?.username}</h4>
          <button onClick={()=>authService.logout}>Logout</button>
        </div>
      ):null}
      </div>
    );
  }
   