import FetchAccount from "../components/Account/FetchAccount";
import CreditsList from "../components/Credits/CreditsList";
import CreditsButtons from "../components/Credits/CreditsButtons";
import classes from "./BuyCreditsPage.module.css";
import { useState } from "react";
import PurchaseConfirm from "../components/Credits/PurchaseConfirm";
import useModal from "../components/hooks/useModal";

function BuyCreditsPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  function handleSelectedAmount(amount) {
    console.log(`selectedAmount: ${amount}`);
    setSelectedAmount(amount);
  }

  return (
    <div className={classes.container}>
      {modalIsShown && (
        <PurchaseConfirm
          onClose={hideModalHandler}
          handleSelectedAmount={handleSelectedAmount}
        />
      )}
      <FetchAccount
        text={"You are logged in as dhmhtrhs.vassiliou@gmail.com"}
      />
      <CreditsList
        selectedAmount={selectedAmount}
        handleSelectedAmount={handleSelectedAmount}
      />
      <CreditsButtons
        selectedAmount={selectedAmount}
        handleSelectedAmount={handleSelectedAmount}
        onShowModal={showModalHandler}
        onHideModal={hideModalHandler}
      />
    </div>
  );
}

export default BuyCreditsPage;
