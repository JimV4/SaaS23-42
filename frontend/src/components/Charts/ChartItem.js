import classes from "./ChartItem.module.css";
import BasicLineImg from "../../assets/basic_line.png";
import LineWithAnnotationsImg from "../../assets/line_with_annotations.png";
import BasicColumnImg from "../../assets/basic_column.png";
import PieChartImg from "../../assets/pie_chart.png";
import DependencyWheelImg from "../../assets/basic_line.png";
import NetworkGraphImg from "../../assets/network_graph.png";

function ChartItem(props) {
  return (
    <div className={`${classes.charts} ${classes[props.title]}`}>
      <img src={props.img} alt={props.alt} className={props.imgClass} />
    </div>
  );
}

export default ChartItem;
