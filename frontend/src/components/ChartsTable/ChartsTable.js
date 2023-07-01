import React, { useEffect, useState } from "react";
import classes from "./ChartsTable.module.css";
import useModal from "../hooks/useModal";
import UploadError from "../UI/UploadError";

import axios from "axios";

function ChartsTable(props) {
  const { modalIsShown, showModalHandler, hideModalHandler } = useModal();

  const [errorMessage, setErrorMessage] = useState("");

  function handleClick(imageURL, imageType) {
    props.onClick(imageURL, imageType);
  }

  async function handlePDF(imageURL, type) {
    try {
      const response = await fetch(
        "http://127.0.0.1:3011/pdf-converter/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            image: imageURL,
            type: type,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const newTitle = imageURL.replace(/\.png$/, ".pdf");
        link.download = `${newTitle}`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Something went wrong while downloading the file!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while downloading the file!");
      showModalHandler();
    }
  }

  async function handlePng(imageURL, type) {
    try {
      const response = await fetch(
        "http://127.0.0.1:3010/stored-charts/download-png",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            image: imageURL,
            type: type,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const newTitle = imageURL;
        link.download = `${newTitle}`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Something went wrong while downloading the file!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while downloading the file!");
      showModalHandler();
    }
  }

  async function handleSvg(imageURL, type) {
    try {
      const response = await fetch(
        "http://127.0.0.1:3012/svg-converter/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            image: imageURL,
            type: type,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const newTitle = imageURL.replace(/\.png$/, ".svg");
        link.download = `${newTitle}`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Something went wrong while downloading the file!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while downloading the file!");
      showModalHandler();
    }
  }

  async function handleHtml(imageURL, type) {
    try {
      const response = await fetch(
        "http://127.0.0.1:3013/html-converter/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            image: imageURL,
            type: type,
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const newTitle = imageURL.replace(/\.png$/, ".html");
        link.download = `${newTitle}`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Something went wrong while downloading the file!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while downloading the file!");
      showModalHandler();
    }
  }

  const data = props.charts;
  console.log(data);
  if (!data) {
    return (
      <div className={classes.tablee}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>chart came</th>
              <th>created On</th>
              <th>download</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }

  return (
    <>
      {modalIsShown && (
        <UploadError message={errorMessage} onClose={hideModalHandler} />
      )}
      <div className={classes.tablee}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>chart came</th>
              <th>created On</th>
              <th>download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.imageURL}
                onClick={() => handleClick(item.imageURL, item.type)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.createdOn}</td>
                <td>
                  <div className={classes.downloadContainer}>
                    <div className={classes.inlineContainer}>
                      <p
                        onClick={() => handlePDF(item.imageURL, item.type)}
                        style={{ cursor: "pointer" }}
                      >
                        pdf
                      </p>
                      <p
                        onClick={() => handlePng(item.imageURL, item.type)}
                        style={{ cursor: "pointer" }}
                      >
                        png
                      </p>
                    </div>
                    <div className={classes.inlineContainer}>
                      <p
                        onClick={() => handleSvg(item.imageURL, item.type)}
                        style={{ cursor: "pointer" }}
                      >
                        svg
                      </p>
                      <p
                        onClick={() => handleHtml(item.imageURL, item.type)}
                        style={{ cursor: "pointer" }}
                      >
                        html
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ChartsTable;
