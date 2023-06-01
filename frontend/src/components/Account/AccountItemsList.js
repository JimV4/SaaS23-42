import classes from "./AccountItemsList.module.css";

function AccountItemsList() {
  async function loadAccountData() {}

  return (
    <div className={classes.container}>
      <div className={classes.wordsContainer}>
        <span>Number of Charts</span>
        <span>Available Credits</span>
        <span>Last Login</span>
      </div>
      <div className={classes.boxesContainer}>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
        <div className={classes.box}></div>
      </div>
    </div>
  );
}

export default AccountItemsList;
