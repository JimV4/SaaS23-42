import Modal from "../UI/Modal";
import classes from "./PurchaseConfirm.module.css";
import { useNavigate } from "react-router-dom";

function PurchaseConfirm(props) {
  const navigate = useNavigate();
  async function buyQuotas() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/quotas/purchase",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            quotas: localStorage.getItem("amount"),
          }),
        }
      );
      if (response.ok) {
        console.log("here");
        navigate("/my-account");
        props.onClose();
      }
    } catch (error) {}
  }

  return (
    <Modal myclass="modal-credits">
      <p>Are you sure you want to purchase?</p>
      <div className={classes.container}>
        <button className={classes.purchase} onClick={buyQuotas}>
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
