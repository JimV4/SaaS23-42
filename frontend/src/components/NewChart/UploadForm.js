import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UploadForm.module.css";
import Button from "../Login/Buttons/Button";
import UploadError from "../UI/UploadError";
import useModal from "../hooks/useModal";

function UploadForm() {
  const navigate = useNavigate();

  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function sendCSVFile() {
    try {
      const formData = new FormData();
      formData.append("csvFile", selectedFile);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/myCharts/diagrams/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const image = response.data.image;
        const title = response.data.title;
        const type = response.data.type;

        setImageUrl(image);
        navigate("/new-chart/created-chart", { state: { image, title, type } });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("Something Went Wrong!"); // if server is down
      } else {
        setErrorMessage(error.response.data.message); // response from orchestrator
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
      <div className={classes["upload-container"]}>
        <label for="images" className={classes["drop-container"]}>
          <span className={classes["drop-title"]}>Drop file here</span>
          or
          <input type="file" required onChange={handleFileChange} />
        </label>
        <div className={classes["buttons-container"]}>
          {selectedFile && (
            <button
              className={`${classes["general-button"]} ${classes["upload-button"]}`}
              onClick={sendCSVFile}
            >
              Upload
            </button>
          )}
          {selectedFile && (
            <button
              className={classes["general-button"]}
              onClick={() => setSelectedFile(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadForm;
