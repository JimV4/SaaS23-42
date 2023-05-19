import React, { useEffect, useState } from "react";

function ChartsTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("some-endpoint");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {}
  }
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
            <tr key={item.chartName}>
              <td>{item.type}</td>
              <td>{item.chartName}</td>
              <td>{item.createdOn}</td>
              <td>
                <a href={item.downloadUrl} download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChartsTable;
