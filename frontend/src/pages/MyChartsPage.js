import classes from "./MyChartsPage.module.css";
import ChartsTable from "../components/Charts Table/ChartsTable";
import ShowedChart from "../components/Charts Table/ShowedChart";

function MyChartsPage() {
  return (
    <>
      <div className={classes.header}>
        <p className={classes.email}>dhmhtrhs.vassiliou@gmail.com</p>
        <div className={classes.links}>
          <a href="#">My Account</a>
          <a href="#">Logout</a>
        </div>
      </div>
      <div className={classes["boxes-container"]}>
        <ChartsTable />
        <ShowedChart />
      </div>
    </>
  );
}

export default MyChartsPage;
