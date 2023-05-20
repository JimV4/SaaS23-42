import React, { useEffect, useState } from "react";

import axios from "axios";

function ChartsTable(props) {
  function handleClick(imageURL) {
    props.onClick(imageURL);
  }

  async function handlePDF(imageURL, title) {
    try {
      // console.log(imageURL, title);
      /* const response = await fetch(
        "http://127.0.0.1:8000/api/myCharts/convert/download-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            imageURL: imageURL,
            title: title,
          }),
          responseType: "stream",
        }
      ); */

      /* if (response.ok) {
        const downloadTitle = title.toLowerCase().replace(/\s+/g, "_");
        console.log(downloadTitle);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${downloadTitle}.pdf`; // Replace with the desired filename and extension
        link.click();
        URL.revokeObjectURL(url);
      } */
      const response = await axios.post(
        "http://127.0.0.1:8000/api/myCharts/convert/download-pdf",
        {
          title: title,
          imageURL: imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "stream",
        }
      );

      const url = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const downloadTitle = title.toLowerCase().replace(/\s+/g, "_");

      const link = document.createElement("a");
      link.href = url;
      link.download = `${downloadTitle}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  const data = props.charts;
  return (
    <div>
      <table>
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
            <tr key={item.imageURL} onClick={() => handleClick(item.imageURL)}>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.createdOn}</td>
              <td>
                <span
                  onClick={() => handlePDF(item.imageURL, item.title)}
                  style={{ cursor: "pointer" }}
                >
                  pdf
                </span>
                <a href="png">png</a>
                <a href="svg">svg</a>
                <a href="html">html</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChartsTable;
