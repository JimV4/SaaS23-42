import "./CreditItem.css";

function CreditItem(props) {
  return (
    <div
      className={`credit-box ${
        props.selected === props.id ? "credit-box-hovered" : ""
      }`}
      onClick={() => props.handleSelected(props.id)}
    >{`${props.amount} Credits`}</div>
  );
}

export default CreditItem;
