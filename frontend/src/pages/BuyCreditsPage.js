import FetchAccount from "../components/Account/FetchAccount";
import CreditsList from "../components/Credits/CreditsList";

function BuyCreditsPage() {
  return (
    <>
      <FetchAccount
        text={"You are logged in as dhmhtrhs.vassiliou@gmail.com"}
      />
      <CreditsList />
    </>
  );
}

export default BuyCreditsPage;
