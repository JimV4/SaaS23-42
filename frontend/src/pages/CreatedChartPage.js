import classes from "./CreatedChartPage.module.css";
import ChartPreview from "../components/CreatedChart/ChartPreview";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Login/Buttons/Button";

function CreatedChartPage() {
  const navigate = useNavigate();

  const state = useLocation();
  const imgPath = state.state.imgPath;
  const parts = imgPath.split("/");
  let newPath = parts[0];

  let chartTitle = newPath
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!chartTitle.includes("Chart")) {
    chartTitle = chartTitle + " Chart";
  }

  function handleDiscard() {
    navigate(-1);
  }

  async function handleSave() {
    /* TO BE IMPLEMENTED */
  }

  return (
    <div className={classes["container"]}>
      <p>{`Your ${chartTitle} is ready!`}</p>
      <ChartPreview imgPath={imgPath} />
      <div className={classes["buttons-container"]}>
        <Button text="Save to My Charts" onClick={handleSave} />
        <Button text="Discard" onClick={handleDiscard} />
      </div>
    </div>
  );
}

export default CreatedChartPage;
