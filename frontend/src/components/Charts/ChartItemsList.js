import ChartsCard from "./ChartsCard";
import ChartItem from "./ChartItem";

import LineChartImg from "../../assets/line_chart.png";
import MultiAxisLineChartImg from "../../assets/multi_axis_line_chart.png";
import ScatterImg from "../../assets/scatter.png";
import BubbleImg from "../../assets/bubble.png";
import RadarImg from "../../assets/radar.png";
import PolarAreaImg from "../../assets/polar_area.png";

export let chartItems = [];

function ChartItemsList() {
  const chartItems = [
    {
      title: "line-chart",
      img: LineChartImg,
      alt: "Line Chart",
      imgClass: "line-chart-img",
    },
    {
      title: "multi-axis-line-chart",
      img: MultiAxisLineChartImg,
      alt: "Multi Axis Line Chart",
      imgClass: "multi-axis-line-chart-img",
    },
    {
      title: "scatter",
      img: ScatterImg,
      alt: "Scatter Chart",
      imgClass: "scatter-img",
    },
    {
      title: "bubble",
      img: BubbleImg,
      alt: "Bubble Chart",
      imgClass: "bubble-chart-img",
    },
    {
      title: "radar",
      img: RadarImg,
      alt: "Radar Chart",
      imgClass: "radar-img",
    },
    {
      title: "polar-area",
      img: PolarAreaImg,
      alt: "Polar Area Chart",
      imgClass: "bubble-img",
    },
  ];

  const chartItemsList = chartItems.map((item) => (
    <ChartItem
      key={item.title}
      title={item.title}
      img={item.img}
      alt={item.alt}
      imgClass={item.imgClass}
    />
  ));
  return <ChartsCard>{chartItemsList}</ChartsCard>;
}

export default ChartItemsList;
