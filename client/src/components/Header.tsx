import classes from "./Header.module.css"

interface HeaderProps{
    user: {
        username: string;
    } | null;
}

export function Header({user}:HeaderProps) {
    return (
    <div className={classes.header}>
      <p>Movie Library </p>
      <p>{user?.username}</p>
      </div>
    );
  }
  