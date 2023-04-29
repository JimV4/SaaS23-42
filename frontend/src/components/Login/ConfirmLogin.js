/* import { useContext } from "react"; */
import classes from "./ConfirmLogin.module.css";
import ConfirmLoginInstructions from "./ConfirmLoginInstructions";
import Button from "./Buttons/Button";
// import ConfirmLoginContext from "../Context/confirm-login-context";
import { Link } from "react-router-dom";

function ConfirmLogin() {
  /* const confirmLoginCtx = useContext(ConfirmLoginContext); */

  return (
    <div className={classes.container}>
      <ConfirmLoginInstructions />
      <div className={classes.buttonsContainer}>
        <Link to="/my-account">
          <Button text={"Continue"} />
        </Link>
        <Link to="../">
          <Button
            text={"No thanks"}
            // onClick={confirmLoginCtx.setConfirmLogin}
          />
        </Link>
      </div>
    </div>
  );
}

export async function loader() {}

export default ConfirmLogin;
