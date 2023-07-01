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
      <Link to="/my-charts">
        <Button text={"My Charts"} />
      </Link>
      <Link to="/new-chart">
        <Button text={"New Chart"} />
      </Link>
      <Link to="/buy-credits">
        <Button text={"Buy Credits"} />
      </Link>
    </div>
  );
}

export default AccountButtons;
