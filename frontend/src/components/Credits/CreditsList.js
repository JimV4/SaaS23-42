import CreditItem from "./CreditItem";
import CreditsContainer from "./CreditsContainer";

function CreditsList() {
  const credits = [
    {
      amount: "5",
    },
    {
      amount: "10",
    },
    {
      amount: "20",
    },
    {
      amount: "50",
    },
  ];

  const creditsList = credits.map((item) => (
    <CreditItem amount={item.amount} />
  ));

  return <CreditsContainer>{creditsList}</CreditsContainer>;
}

export default CreditsList;
