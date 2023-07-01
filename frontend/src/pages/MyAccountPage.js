import MyChartsLogo from "../components/UI/MyChartsLogo";
import FetchAccount from "../components/Account/FetchAccount";
import AccountItemsList from "../components/Account/AccountItemsList";
import classes from "./MyAccountPage.module.css";
import AccountButtons from "../components/Account/AccountButtons";

function MyAccountPage() {
  return (
    <div className={classes.container}>
      <FetchAccount text={"Hello dhmhtrhs.vassiliou@gmail.com"} />
      <AccountItemsList />
      <AccountButtons />
    </div>
  );
}

export default MyAccountPage;
