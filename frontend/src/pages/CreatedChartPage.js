import classes from "./CreatedChartPage.module.css";
import ChartPreview from "../components/CreatedChart/ChartPreview";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Login/Buttons/Button";
import useModal from "../components/hooks/useModal";
import { useState } from "react";
import UploadError from "../components/UI/UploadError";

function CreatedChartPage() {
  const navigate = useNavigate();

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  const state = useLocation();
  const imgPath = state.state.imgPath;

  function handleDiscard() {
    navigate(-1);
  }

  async function handleSave() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/diagrams/save-chart",
        {
          method: "PATCH",
          body: JSON.stringify({
            path: imgPath,
          }), // takes a javascript object and converts it to json
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      setErrorMessage("Something Went Wrong! Please try again later...");
      if (error.message === "Network Error") {
        setErrorMessage("Something Went Wrong! Please try again later...");
      } else {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
      showModalHandler();
    }
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
      <div className={classes["container"]}>
        <ChartPreview imgPath={imgPath} />
        <div className={classes["buttons-container"]}>
          <Button text="Save to My Charts" onClick={handleSave} />
          <Button text="Discard" onClick={handleDiscard} />
        </div>
      </div>
    </>
  );
}

export default CreatedChartPage;
