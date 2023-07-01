import classes from "./MyChartsLogoV.module.css";
import myChartsImage from "../../assets/myCharts-logo2.jpg";
import React from "react";

function MyChartsLogoV() {
  return (
    <React.Fragment>
      <header className={classes.logo}>
        <h1 className={classes.myCharts}>myCharts</h1>
        <img
          src={myChartsImage}
          alt="myCharts logo"
          className={classes["myCharts-logo"]}
        />
      </header>
    </React.Fragment>
  );
}

export default MyChartsLogoV;
