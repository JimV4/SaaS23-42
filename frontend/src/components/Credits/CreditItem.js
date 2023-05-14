import "./CreditItem.css";

function CreditItem(props) {
  return (
    <div
      className={`credit-box ${
        props.selectedAmount === props.amount ? "credit-box-hovered" : ""
      }`}
      onClick={() => props.handleSelectedAmount(props.amount)}
    >{`${props.amount} Credits`}</div>
  );
}

export default CreditItem;
