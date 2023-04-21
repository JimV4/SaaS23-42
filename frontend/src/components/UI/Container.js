import classes from "./Container.module.css";
import Instructions from "./Instructions";
import GoogleButton from "./GoogleButton";

function Container() {
  return (
    <div className={classes.container}>
      <Instructions />
      <GoogleButton />
      <a href="" className={classes.about}>
        about
      </a>
    </div>
  );
}

export default Container;
