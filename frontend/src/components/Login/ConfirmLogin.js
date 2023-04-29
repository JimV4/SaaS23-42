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
        <a href="https://accounts.google.com/InteractiveLogin/signinchooser?ifkv=Af_xneEs8OwI2ND93gWwm-R8gXxBuV2XmOlL0Pqg3X-Uw_an7HHP1cZwEQxfkAFOeB5aixu10vv6MA&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
          <Button text={"Continue"} />
        </a>
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
