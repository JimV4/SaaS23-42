import { useState } from "react";
import CreditItem from "./CreditItem";
import CreditsContainer from "./CreditsContainer";

function CreditsList(props) {
  const credits = [
    {
      id: "0",
      amount: "5",
    },
    {
      id: "1",
      amount: "10",
    },
    {
      id: "2",
      amount: "20",
    },
    {
      id: "3",
      amount: "50",
    },
  ];

  const creditsList = credits.map((item) => (
    <CreditItem
      id={item.id}
      amount={item.amount}
      handleSelected={props.handleSelected}
      selected={props.selected}
    />
  ));

  return <CreditsContainer>{creditsList}</CreditsContainer>;
}

export default CreditsList;
