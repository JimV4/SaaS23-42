import ChartsCard from "./ChartsCard";
import ChartItem from "./ChartItem";
import BasicLineImg from "../../assets/basic_line.png";
import LineWithAnnotationsImg from "../../assets/line_with_annotations.png";
import BasicColumnImg from "../../assets/basic_column.png";
import PieChartImg from "../../assets/pie_chart.png";
import DependencyWheelImg from "../../assets/basic_line.png";
import NetworkGraphImg from "../../assets/network_graph.png";

export let chartItems = [];

function ChartItemsList() {
  chartItems = [
    {
      title: "basic-line",
      img: BasicLineImg,
      alt: "Basic Line Chart",
      imgClass: "basic-line-img",
    },
    {
      title: "line-with-annotations",
      img: LineWithAnnotationsImg,
      alt: "Line With Annotations Chart",
      imgClass: "line-with-annotations-img",
    },
    {
      title: "basic-column",
      img: BasicColumnImg,
      alt: "Basic Column Chart",
      imgClass: "basic-column-img",
    },
    {
      title: "pie-chart",
      img: PieChartImg,
      alt: "Pie Chart",
      imgClass: "pie-chart-img",
    },
    {
      title: "dependency-wheel",
      img: DependencyWheelImg,
      alt: "Dependency Wheel Chart",
      imgClass: "dependency-wheel-img",
    },
    {
      title: "network-graph",
      img: NetworkGraphImg,
      alt: "Network Graph Chart",
      imgClass: "network-graph-img",
    },
  ];

  const chartItemsList = chartItems.map((item) => (
    <ChartItem
      title={item.title}
      img={item.img}
      alt={item.alt}
      imgClass={item.imgClass}
    />
  ));
  return <ChartsCard>{chartItemsList}</ChartsCard>;
}

export default ChartItemsList;
