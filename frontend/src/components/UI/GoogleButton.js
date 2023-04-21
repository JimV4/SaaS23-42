import classes from "./GoogleButton.module.css";
import GoogleFavicon from "../../assets/google-favicon2.png";

function GoogleButton() {
  return (
    <button className={classes["google-login-button"]}>
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
