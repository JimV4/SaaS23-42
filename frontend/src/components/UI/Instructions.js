import classes from "./Instructions.module.css";

function Instructions() {
  return (
    <p className={classes.instructions}>
      press on a diagram type to see how this works, or login with your google
      account to start creating your diagrams
    </p>
  );
}

export default Instructions;
