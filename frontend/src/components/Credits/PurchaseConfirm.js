import Modal from "../UI/Modal";
import classes from "./PurchaseConfirm.module.css";
import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";
import { useState } from "react";
import UploadError from "../UI/UploadError";

function PurchaseConfirm(props) {
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

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
      } else {
        throw new Error("Something went wrong while buying credits!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while buying credits!");
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
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
    </>
  );
}

export default PurchaseConfirm;
