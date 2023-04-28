import classes from "./ChartsCard.module.css";

function ChartsCard(props) {
  return <div className={classes["charts-container"]}>{props.children}</div>;
}

export default ChartsCard;
