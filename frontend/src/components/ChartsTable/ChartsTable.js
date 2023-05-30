import React, { useEffect, useState } from "react";

import axios from "axios";

function ChartsTable(props) {
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
        throw new Error("Something went wrong while downloading the file.");
      }
    } catch (error) {
      console.error(error);
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
        throw new Error("Something went wrong while downloading the file.");
      }
    } catch (error) {
      console.error(error);
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
        throw new Error("Something went wrong while downloading the file.");
      }
    } catch (error) {
      console.error(error);
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
        throw new Error("Something went wrong while downloading the file.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const data = props.charts;
  console.log(data);
  return (
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Type</th>
    //         <th>chart came</th>
    //         <th>created On</th>
    //         <th>download</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((item) => (
    //         <tr
    //           key={item.imageURL}
    //           onClick={() => handleClick(item.imageURL, item.type)}
    //           style={{ cursor: "pointer" }}
    //         >
    //           <td>{item.type}</td>
    //           <td>{item.title}</td>
    //           <td>{item.createdOn}</td>
    //           <td>
    //             <span
    //               onClick={() => handlePDF(item.imageURL, item.type)}
    //               style={{ cursor: "pointer" }}
    //             >
    //               pdf
    //             </span>
    //             <span
    //               onClick={() => handlePng(item.imageURL, item.type)}
    //               style={{ cursor: "pointer" }}
    //             >
    //               png
    //             </span>
    //             <span
    //               onClick={() => handleSvg(item.imageURL, item.type)}
    //               style={{ cursor: "pointer" }}
    //             >
    //               svg
    //             </span>
    //             <span
    //               onClick={() => handleHtml(item.imageURL, item.type)}
    //               style={{ cursor: "pointer" }}
    //             >
    //               html
    //             </span>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                color: "#1098ad",
                border: "1px solid black",
                padding: "8px",
              }}
            >
              Type
            </th>
            <th
              style={{
                color: "#1098ad",
                border: "1px solid black",
                padding: "8px",
              }}
            >
              Chart Name
            </th>
            <th
              style={{
                color: "#1098ad",
                border: "1px solid black",
                padding: "8px",
              }}
            >
              Created On
            </th>
            <th
              style={{
                color: "#1098ad",
                border: "1px solid black",
                padding: "8px",
              }}
            >
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.imageURL}
              onClick={() => handleClick(item.imageURL, item.type)}
              style={{ cursor: "pointer" }}
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.type}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.createdOn}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <span
                  onClick={() => handlePDF(item.imageURL, item.type)}
                  style={{
                    cursor: "pointer",
                    marginRight: "8px",
                    color: "blue",
                  }}
                >
                  pdf
                </span>
                <span
                  onClick={() => handlePng(item.imageURL, item.type)}
                  style={{
                    cursor: "pointer",
                    marginRight: "8px",
                    color: "blue",
                  }}
                >
                  png
                </span>
                <span
                  onClick={() => handleSvg(item.imageURL, item.type)}
                  style={{
                    cursor: "pointer",
                    marginRight: "8px",
                    color: "blue",
                  }}
                >
                  svg
                </span>
                <span
                  onClick={() => handleHtml(item.imageURL, item.type)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  html
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChartsTable;
