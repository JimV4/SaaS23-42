import FetchAccount from "../components/Account/FetchAccount";
import CreditsList from "../components/Credits/CreditsList";
import CreditsButtons from "../components/Credits/CreditsButtons";
import classes from "./BuyCreditsPage.module.css";

function BuyCreditsPage() {
  return (
    <div className={classes.container}>
      <FetchAccount
        text={"You are logged in as dhmhtrhs.vassiliou@gmail.com"}
      />
      <CreditsList />
      <CreditsButtons />
    </div>
  );
}

export default BuyCreditsPage;
