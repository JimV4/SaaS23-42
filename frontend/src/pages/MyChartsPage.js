import classes from "./MyChartsPage.module.css";
import ChartsTable from "../components/ChartsTable/ChartsTable";
import ShowedChart from "../components/ChartsTable/ShowedChart";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

function MyChartsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("here");
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
      } catch (error) {
        // Handle any error that occurred during the fetch request
      }
    };

    // Fetch the data only when the component is initially mounted
    fetchData();
  }, []);

  function handleChartClick(url, imageType) {
    axios
      .get(`http://127.0.0.1:3010/${imageType}/${url}`, {
        responseType: "arraybuffer", // Set the response type to 'arraybuffer'
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const imageData = response.data;
        const blob = new Blob([imageData], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        setImageURL(imageUrl);
        console.log(response);
        /* navigate("/new-chart/created-chart", {
          state: { imageUrl },
        }); */
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  return (
    <>
      <div className={classes.header}>
        <p className={classes.email}>{localStorage.getItem("email")}</p>
        <div className={classes.links}>
          <a href="/my-account">My Account</a>
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
