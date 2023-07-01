import useModal from "../hooks/useModal";
import UploadError from "../UI/UploadError";
import { useState } from "react";
import classes from "./AccountItemsList.module.css";

function AccountItemsList() {
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  const [lastLogin, setLastLogin] = useState(null);
  const [quotas, setQuotas] = useState(null);
  const [charts, setCharts] = useState(null);

  async function loadAccountData() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/auth/my-account",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      /** TODO: DEAL WITH RESPONSE **/

      const jsonresponse = await response.json();

      if (jsonresponse.ok) {
        setLastLogin(jsonresponse.lastLogin);
        setQuotas(jsonresponse.quotas);
        setCharts(jsonresponse.charts);
      } else {
        setErrorMessage("Something went wrong!");
        showModalHandler();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong!");
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
          <div className={classes.box}>{charts}</div>
          <div className={classes.box}>{quotas}</div>
          <div className={classes.box}>{lastLogin}</div>
        </div>
      </div>
    </>
  );
}

export default AccountItemsList;
