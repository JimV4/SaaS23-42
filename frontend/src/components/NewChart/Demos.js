import { useState } from "react";
import classes from "./Demos.module.css";
import ChartItem from "../Charts/ChartItem";

import BasicLineImg from "../../assets/basic_line.png";
import LineWithAnnotationsImg from "../../assets/line_with_annotations.png";
import BasicColumnImg from "../../assets/basic_column.png";
import PieChartImg from "../../assets/pie_chart.png";
import DependencyWheelImg from "../../assets/basic_line.png";
import NetworkGraphImg from "../../assets/network_graph.png";

function Demos() {
  const chartItems = [
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

  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevClick() {
    const newIndex = (currentIndex - 1 + chartItems.length) % chartItems.length;
    setCurrentIndex(newIndex);
  }

  function handleNextClick() {
    const newIndex = (currentIndex + 1) % chartItems.length;
    setCurrentIndex(newIndex);
  }

  return (
    <>
      <div className={classes["demo-container"]}>
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={classes["left-arrow"]}
          onClick={handlePrevClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          ></path>
        </svg>
        <ChartItem
          title={chartItems[currentIndex].title}
          img={chartItems[currentIndex].img}
          alt={chartItems[currentIndex].alt}
          imgClass={chartItems[currentIndex].imgClass}
        />
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={classes["right-arrow"]}
          onClick={handleNextClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          ></path>
        </svg>
      </div>
      <p className={classes.instructions}>
        Download chart description template for {chartItems[currentIndex].alt}
      </p>
    </>
  );
}

export default Demos;
