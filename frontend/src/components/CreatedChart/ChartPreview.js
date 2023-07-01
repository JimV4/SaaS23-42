import classes from "./ChartPreview.module.css";
import { useEffect, useState } from "react";

function ChartPreview(props) {
  const newType = props.type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <>
      <p>{`Your ${newType} is ready!`}</p>
      <div className={classes["chart-preview"]}>
        {
          <img
            className={classes.image}
            src={props.image}
            alt="Your Created Chart"
          />
        }
      </div>
    </>
  );
}

export default ChartPreview;
