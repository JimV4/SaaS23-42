import classes from "./MyChartsPage.module.css";
import ChartsTable from "../components/Charts Table/ChartsTable";
import ShowedChart from "../components/Charts Table/ShowedChart";
import { useState, useEffect } from "react";

function MyChartsPage() {
  const [data, setData] = useState([]);

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/diagrams/my-charts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(jsonData.data);
    } catch (error) {}
  }

  function handleChartClick(url) {
    setImageURL(url);
  }

  return (
    <>
      <div className={classes.header}>
        <p className={classes.email}>dhmhtrhs.vassiliou@gmail.com</p>
        <div className={classes.links}>
          <a href="#">My Account</a>
          <a href="#">Logout</a>
        </div>
      </div>
      <div className={classes["boxes-container"]}>
        <ChartsTable charts={data} onClick={handleChartClick} />
        <ShowedChart chartImage={imageURL} />
      </div>
    </>
  );
}

export default MyChartsPage;
