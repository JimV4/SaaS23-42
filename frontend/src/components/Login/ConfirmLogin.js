import classes from "./ConfirmLogin.module.css";
import ConfirmLoginInstructions from "./ConfirmLoginInstructions";
import Button from "./Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useModal from "../hooks/useModal";
import UploadError from "../UI/UploadError";

function ConfirmLogin() {
  const navigate = useNavigate();

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  async function continueHandler() {
    console.log("here");
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/myCharts/auth/verifylogin/${userID}`,
        {
          method: "PATCH",
        }
      );

      const confirmLogin = await response.json();
      console.log(confirmLogin);

      if (confirmLogin.message === "You were successfully logged in!") {
        localStorage.setItem("token", confirmLogin.token);
        console.log(localStorage.getItem("token"));
        navigate("/my-account");
      } else {
        setErrorMessage(confirmLogin.message);
        showModalHandler();
        console.log(confirmLogin);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something Went Wrong! Please try again later...");
      showModalHandler();
    }
  }

  async function noHandler() {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/myCharts/auth/cancellogin/${userID}`,
        {
          method: "DELETE",
        }
      );
      localStorage.clear();
      navigate("/");

      const jsonresponse = await response.json();
      if (jsonresponse.status === "failed") {
        setErrorMessage(jsonresponse.message);
        console.log(jsonresponse);
        showModalHandler();
      }
      console.log(jsonresponse);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something Went Wrong! Please try again later...");
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
      <div className={classes.container}>
        <ConfirmLoginInstructions />
        <div className={classes.buttonsContainer}>
          <Button text={"Continue"} onClick={continueHandler} />
          <Button text={"No thanks"} onClick={noHandler} />
        </div>
      </div>
    </>
  );
}

export async function loader() {}

export default ConfirmLogin;
