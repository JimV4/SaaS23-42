import classes from "./GoogleButton.module.css";
import GoogleFavicon from "../../assets/google-favicon2.png";
import { useContext } from "react";
import ConfirmLoginContext from "../Context/confirm-login-context";

function GoogleButton() {
  const confirmLoginCtx = useContext(ConfirmLoginContext);

  return (
    <button
      className={classes["google-login-button"]}
      onClick={confirmLoginCtx.setConfirmLogin}
    >
      <img
        src={GoogleFavicon}
        alt="Google favicon"
        className={classes["google-favicon"]}
      />
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
