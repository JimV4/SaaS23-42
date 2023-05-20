import { useState } from "react";
import classes from "./ShowedChart.module.css";

function ShowedChart(props) {
  return (
    <div className={classes["chart-preview"]}>
      <img src={props.chartImage} alt="selected chart" />
    </div>
  );
}

export default ShowedChart;
