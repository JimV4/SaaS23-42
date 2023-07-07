import MyChartsLogo from "../components/UI/MyChartsLogo";
import FetchAccount from "../components/Account/FetchAccount";
import AccountItemsList from "../components/Account/AccountItemsList";
import classes from "./MyAccountPage.module.css";
import AccountButtons from "../components/Account/AccountButtons";
import { useLocation } from "react-router-dom";

function MyAccountPage() {
  const userEmail = localStorage.getItem("email");
  return (
    <div className={classes.container}>
      <FetchAccount text={`Hello ${userEmail}`} />
      <AccountItemsList />
      <AccountButtons />
    </div>
  );
}

export default MyAccountPage;
