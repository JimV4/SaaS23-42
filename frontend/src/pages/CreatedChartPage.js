import classes from "./CreatedChartPage.module.css";
import ChartPreview from "../components/CreatedChart/ChartPreview";
import { json, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Login/Buttons/Button";
import useModal from "../components/hooks/useModal";
import { useState } from "react";
import UploadError from "../components/UI/UploadError";

function CreatedChartPage() {
  const navigate = useNavigate();

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  const state = useLocation();
  const image = state.state.image;
  const title = state.state.title;
  const type = state.state.type;

  async function handleDiscard() {
    /* try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/diagrams/delete-chart",
        {
          method: "DELETE",
          body: JSON.stringify({
            path: image,
          }), // takes a javascript object and converts it to json
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse.status === "success") {
        navigate(-1);
      } else if (jsonresponse.status === "failed") {
        console.log(jsonresponse);
        setErrorMessage(jsonresponse.message);
        showModalHandler();
      }
    } catch (error) {
      setErrorMessage("Something went wrong! Please try again later...");
      console.log(error);
      showModalHandler();
    } */
    navigate(-1);
  }

  async function handleSave() {
    try {
      console.log(image);
      const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/diagrams/save-chart",
        {
          method: "PATCH",
          body: JSON.stringify({
            image: image,
            title: title,
            type: type,
          }), // takes a javascript object and converts it to json
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse.status === "success") {
        navigate("/my-charts");
      } else if (jsonresponse.status === "failed") {
        console.log(jsonresponse);
        setErrorMessage(jsonresponse.message);
        showModalHandler();
      }
    } catch (error) {
      setErrorMessage("Something went wrong! Please try again later...");
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
        <ChartPreview image={image} />
        <div className={classes["buttons-container"]}>
          <Button text="Save to My Charts" onClick={handleSave} />
          <Button text="Discard" onClick={handleDiscard} />
        </div>
      </div>
    </>
  );
}

export default CreatedChartPage;
