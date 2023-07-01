import { useState } from "react";
import classes from "./ShowedChart.module.css";

function ShowedChart(props) {
  if (!props.chartImage) {
    return (
      <div className={classes["chart-preview"]}>
        <p>Click on a chart to preview</p>
      </div>
    );
  }
  return (
    <div className={classes["chart-preview"]}>
      <img
        src={props.chartImage}
        alt="selected chart"
        className={classes.image}
      />
    </div>
  );
}

export default ShowedChart;
