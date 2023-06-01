import classes from "./MyChartsPage.module.css";
import ChartsTable from "../components/ChartsTable/ChartsTable";
import ShowedChart from "../components/ChartsTable/ShowedChart";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import useModal from "../components/hooks/useModal";
import UploadError from "../components/UI/UploadError";

function MyChartsPage() {
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

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
        if (response.ok) {
          setData(jsonData.data);
        } else {
          setErrorMessage("Something went wrong!");
          showModalHandler();
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong!");
        showModalHandler();
      }
    };

    // Fetch the data only when the component is initially mounted
    fetchData();
  }, []);

  async function handleChartClick(url, imageType) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3010/${imageType}/${url}`,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const imageData = response.data;
        const blob = new Blob([imageData], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        setImageURL(imageUrl);
        console.log(response);
      } else {
        setErrorMessage("Something went wrong!");
        showModalHandler();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong!");
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
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
