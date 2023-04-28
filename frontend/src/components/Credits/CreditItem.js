import classes from "./CreditItem.module.css";

function CreditItem(props) {
  return (
    <div className={classes["credit-box"]}>{`${props.amount} Credits`}</div>
  );
}

export default CreditItem;
