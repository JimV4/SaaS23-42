import classes from "./GoogleButton.module.css";
import GoogleFavicon from "../../assets/google-favicon2.png";
/* import { useContext } from "react";
import ConfirmLoginContext from "../Context/confirm-login-context"; */
import { Link } from "react-router-dom";

function GoogleButton() {
  /* const confirmLoginCtx = useContext(ConfirmLoginContext); */

  return (
    <Link to="/login" style={{ textDecoration: "none" }}>
      <button
        className={classes["google-login-button"]}
        /* onClick={confirmLoginCtx.setConfirmLogin} */
      >
        <img
          src={GoogleFavicon}
          alt="Google favicon"
          className={classes["google-favicon"]}
        />
        Sign in with Google
      </button>
    </Link>
  );
}

export default GoogleButton;
