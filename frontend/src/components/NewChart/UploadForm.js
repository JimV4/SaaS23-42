import { useState } from "react";
import classes from "./UploadForm.module.css";
import Button from "../Login/Buttons/Button";

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
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
  );
}

export default UploadForm;
