/* import { useContext } from "react"; */
import classes from "./ConfirmLogin.module.css";
import ConfirmLoginInstructions from "./ConfirmLoginInstructions";
import Button from "./Buttons/Button";
// import ConfirmLoginContext from "../Context/confirm-login-context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ConfirmLogin() {
  const navigate = useNavigate();
  /* const confirmLoginCtx = useContext(ConfirmLoginContext); */

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
      /* TODO */
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
      /* TODO */
    }
  }

  return (
    <div className={classes.container}>
      <ConfirmLoginInstructions />
      <div className={classes.buttonsContainer}>
        <Button text={"Continue"} onClick={continueHandler} />
        <Button
          text={"No thanks"}
          onClick={noHandler}
          // onClick={confirmLoginCtx.setConfirmLogin}
        />
      </div>
    </div>
  );
}

export async function loader() {}

export default ConfirmLogin;
