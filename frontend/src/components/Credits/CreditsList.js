import { useState } from "react";
import CreditItem from "./CreditItem";
import CreditsContainer from "./CreditsContainer";

function CreditsList(props) {
  const credits = [
    { amount: "5" },
    { amount: "10" },
    { amount: "20" },
    { amount: "50" },
  ];

  const creditsList = credits.map((item) => (
    <CreditItem
      key={item.amount}
      amount={item.amount}
      handleSelectedAmount={props.handleSelectedAmount}
      selected={props.selected}
    />
  ));

  return <CreditsContainer>{creditsList}</CreditsContainer>;
}

export default CreditsList;
