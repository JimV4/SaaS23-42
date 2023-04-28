import Modal from "./Modal";
import classes from "./PurchaseConfirm.module.css";

function PurchaseConfirm(props) {
  return (
    <Modal>
      <p>Are you sure you want to purchase?</p>
      <div className={classes.container}>
        <button
          className={classes.purchase}
          onClick={function (event) {
            props.onClose();
            props.handleSelected(null);
          }}
        >
          Yes
        </button>
        <button
          className={classes.purchase}
          onClick={function (event) {
            props.onClose();
            props.handleSelected(null);
          }}
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default PurchaseConfirm;
