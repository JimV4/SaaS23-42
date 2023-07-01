import "./CreditItem.css";

function CreditItem(props) {
  function chooseItem() {
    props.handleSelected(props.id);
    localStorage.setItem("amount", props.amount);
  }
  return (
    <div
      className={`credit-box ${
        props.selected === props.id ? "credit-box-hovered" : ""
      }`}
      onClick={chooseItem}
    >{`${props.amount} Credits`}</div>
  );
}

export default CreditItem;
