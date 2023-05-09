import { useState } from "react";
import classes from "./Demos.module.css";
import axios from "axios";
import ChartItem from "../Charts/ChartItem";

import LineChartImg from "../../assets/line_chart.png";
import MultiAxisLineChartImg from "../../assets/multi_axis_line_chart.png";
import ScatterImg from "../../assets/scatter.png";
import BubbleImg from "../../assets/bubble.png";
import RadarImg from "../../assets/radar.png";
import PolarAreaImg from "../../assets/polar_area.png";

function Demos() {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevClick() {
    const newIndex = (currentIndex - 1 + chartItems.length) % chartItems.length;
    setCurrentIndex(newIndex);
  }

  function handleNextClick() {
    const newIndex = (currentIndex + 1) % chartItems.length;
    setCurrentIndex(newIndex);
  }

  async function handleCSVDownload(title) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/myCharts/download/${title}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream", // Set the appropriate content type
          },
          responseType: "blob", // Specify the response type as 'blob'
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.txt`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Error downloading the file:", response.status);
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
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
          onClick={handleCSVDownload(chartItems[currentIndex].title)}
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
