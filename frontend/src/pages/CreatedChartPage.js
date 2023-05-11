import classes from "./CreatedChartPage.module.css";
import ChartPreview from "../components/CreatedChart/ChartPreview";
import { useLocation } from "react-router-dom";

function CreatedChartPage() {
  const state = useLocation();
  const imgPath = state.state.imgPath;

  return (
    <div className={classes["container"]}>
      <p>Your selected chart is ready!</p>
      <ChartPreview imgPath={imgPath} />
    </div>
  );
}

export default CreatedChartPage;
