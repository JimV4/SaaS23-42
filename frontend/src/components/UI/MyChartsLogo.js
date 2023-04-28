import React from "react";
import classes from "./MyChartsLogo.module.css";
import myChartsImage from "../../assets/myCharts-logo2.jpg";
import { Outlet } from "react-router-dom";

function MyChartsLogo() {
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

      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default MyChartsLogo;
