import classes from "./CreditsContainer.module.css";

function CreditsContainer(props) {
  return <div className={classes["credits-container"]}>{props.children}</div>;
}

export default CreditsContainer;
