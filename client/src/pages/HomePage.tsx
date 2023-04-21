import { Button } from "../components/Button"
import classes from "./HomePage.module.css"

export function HomePage() {
    return (
      <div className={classes.body}>
        <h1>Hello to my movie project!</h1>
        <h4>This site is made with lots of love and aims to popularize movie watching by sharing information about many of them. 
          Here you can find a wide variety of movies as well as information about them such as actors, release date, budget and much more. 
          You can also share information about your favorite movies, as well as comment and like other movies on the site. 
          I should note that this site is still under development and the collection of movie content is not large and not all the bugs on the site have been fixed.
           Thanks for understanding!</h4>
      </div>
    );
  }