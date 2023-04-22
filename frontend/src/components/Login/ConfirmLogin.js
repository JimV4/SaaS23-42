import { useContext } from "react";
import classes from "./ConfirmLogin.module.css";
import ConfirmLoginInstructions from "./ConfirmLoginInstructions";
import Button from "./Buttons/Button";
import ConfirmLoginContext from "../Context/confirm-login-context";

function ConfirmLogin() {
  const confirmLoginCtx = useContext(ConfirmLoginContext);

  return (
    <div className={classes.container}>
      <ConfirmLoginInstructions />
      <div className={classes.buttonsContainer}>
        <Button text={"Continue"} />
        <Button text={"No thanks"} onClick={confirmLoginCtx.setConfirmLogin} />
      </div>
    </div>
  );
}

export default ConfirmLogin;
