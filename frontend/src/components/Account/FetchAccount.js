import classes from "./FetchAccount.module.css";

function FetchAccount(props) {
  return <p className={classes["fetch-account"]}>{props.text}</p>;
  // εδω πρεπει να ερχεται το account αυτου που εκανε Login
}

export default FetchAccount;
