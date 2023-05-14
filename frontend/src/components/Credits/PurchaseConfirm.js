import Modal from "../UI/Modal";
import classes from "./PurchaseConfirm.module.css";

function PurchaseConfirm(props) {
  const a = 0;

  return (
    <Modal myclass={"modal-credits"}>
      <p>Are you sure you want to purchase?</p>
      <div className={classes.container}>
        <button
          className={classes.purchase}
          onClick={function (event) {
            props.onClose();
            props.handleSelectedAmount(null);
          }}
        >
          Yes
        </button>
        <button
          className={classes.purchase}
          onClick={function (event) {
            props.onClose();
            props.handleSelectedAmount(null);
          }}
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default PurchaseConfirm;
