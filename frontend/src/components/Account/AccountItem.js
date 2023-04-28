import classes from "../Account/AccountItem.module.css";

function AccountItem(props) {
  return (
    <div className={classes.container}>
      <p className={classes.title}>{props.title}</p>
      <div className={classes.box} />
    </div>
  );
}

export default AccountItem;
