import { Button } from "../components/Button"
import classes from "./HomePage.module.css"

export function HomePage() {
    return (
      <div className={classes.body}>
        <h1>Hello to my movie project!</h1>
        <h1>To see the movie collection click here:</h1>
        <Button type="submit" onClick={() => { window.location.href = "http://127.0.0.1:3000/movies" }}>Collection</Button>
      </div>
    );
  }