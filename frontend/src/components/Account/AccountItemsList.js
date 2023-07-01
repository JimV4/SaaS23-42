import useModal from "../hooks/useModal";
import UploadError from "../UI/UploadError";
import { useState } from "react";
import classes from "./AccountItemsList.module.css";

function AccountItemsList() {
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  async function loadAccountData() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/my-account`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      /** TODO: DEAL WITH RESPONSE **/

      const jsonresponse = await response.json();

      if (jsonresponse.ok) {
      } else {
        setErrorMessage("Something went wrong while downloading the file!");
        showModalHandler();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while downloading the file!");
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
      <div className={classes.container}>
        <div className={classes.wordsContainer}>
          <span>Number of Charts</span>
          <span>Available Credits</span>
          <span>Last Login</span>
        </div>
        <div className={classes.boxesContainer}>
          <div className={classes.box}></div>
          <div className={classes.box}></div>
          <div className={classes.box}></div>
        </div>
      </div>
    </>
  );
}

export default AccountItemsList;
