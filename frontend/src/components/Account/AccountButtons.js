import { Link } from "react-router-dom";
import Button from "../Login/Buttons/Button";

function AccountButtons() {
  return (
    <div
      style={{
        margin: "40px",
        display: "flex",
        gap: "15px",
      }}
    >
      <Button text={"My Charts"} />
      <Button text={"New Chart"} />
      <Link to="/buy-credits">
        <Button text={"Buy Credits"} />
      </Link>
    </div>
  );
}

export default AccountButtons;
