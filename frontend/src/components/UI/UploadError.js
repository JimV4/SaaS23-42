import Modal from "./Modal";
import useModal from "../hooks/useModal";

import classes from "./UploadError.module.css";
import { useState } from "react";

function UploadError(props) {
  const [modalIsShown, setModalIsShown] = useState(false);

  function showModalHandler() {
    setModalIsShown(true);
  }

  function hideModalHandler() {
    setModalIsShown(false);
  }
  const myclass = "modal-error";
  return (
    <Modal myclass={myclass}>
      <svg
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={classes.close}
        onClick={props.onClose}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>

      <p className={classes.message}>{props.message}</p>
    </Modal>
  );
}

export default UploadError;
