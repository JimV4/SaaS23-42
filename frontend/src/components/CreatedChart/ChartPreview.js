import classes from "./ChartPreview.module.css";

function ChartPreview(props) {
  console.log(props.imgPath);
  return (
    <div className={classes["chart-preview"]}>
      <img src={`../../../../${props.imgPath}`} alt="Your Created Chart" />
    </div>
  );
}

export default ChartPreview;
