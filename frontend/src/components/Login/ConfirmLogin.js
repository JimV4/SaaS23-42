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
      }
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("Something Went Wrong! Please try again later...");
      } else {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
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
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("Something Went Wrong! Please try again later...");
      } else {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
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
