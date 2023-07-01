import FetchAccount from "../components/Account/FetchAccount";
import CreditsList from "../components/Credits/CreditsList";
import CreditsButtons from "../components/Credits/CreditsButtons";
import classes from "./BuyCreditsPage.module.css";
import { useState } from "react";
import PurchaseConfirm from "../components/Credits/PurchaseConfirm";
import useModal from "../components/hooks/useModal";

function BuyCreditsPage() {
  const [selected, setSelected] = useState(null);

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  function handleSelected(index) {
    setSelected(index);
  }

  return (
    <div className={classes.container}>
      {modalIsShown && (
        <PurchaseConfirm
          onClose={hideModalHandler}
          handleSelected={handleSelected}
        />
      )}
      <FetchAccount
        text={"You are logged in as dhmhtrhs.vassiliou@gmail.com"}
      />
      <CreditsList selected={selected} handleSelected={handleSelected} />
      <CreditsButtons
        selected={selected}
        handleSelected={handleSelected}
        onShowModal={showModalHandler}
        onHideModal={hideModalHandler}
      />
    </div>
  );
}

export default BuyCreditsPage;
