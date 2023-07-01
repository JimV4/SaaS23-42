import AccountItem from "../Account/AccountItem";
import classes from "./AccountItemsList.module.css";

function AccountItemsList() {
  const accountItems = [
    {
      title: "Number of charts",
    },
    {
      title: "Available credits",
    },
    {
      title: "Last login",
    },
  ];

  const accountItemsList = accountItems.map((item) => (
    <AccountItem title={item.title} key={item.title} />
  ));

  return <ul>{accountItemsList}</ul>;
}

export default AccountItemsList;
