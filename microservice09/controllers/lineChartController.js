const lineChartConfiguration = {
  xaxis: {
    labels: [],
  },
  yaxis: {
    datasets: [],
  },
};

exports.getLineChartConfig = (data) => {
  try {
    if (data["width"])
      lineChartConfiguration["width"] = parseInt(data["width"]);
    if (data["height"])
      lineChartConfiguration["height"] = parseInt(data["height"]);
    if (data["title"]) lineChartConfiguration["title"] = data["title"];
    if (data["X-axis title"])
      lineChartConfiguration["xaxis"]["title"] = data["X-axis title"];
    if (data["Y-axis title"])
      lineChartConfiguration["yaxis"]["title"] = data["Y-axis title"];
    if (data["X-axis grid"])
      lineChartConfiguration["xaxis"]["grid"] =
        data["X-axis grid"].toLowerCase() == "true"
          ? true
          : data["X-axis grid"].toLowerCase() == "false"
          ? false
          : null;
    if (data["Y-axis grid"])
      lineChartConfiguration["yaxis"]["grid"] =
        data["Y-axis grid"].toLowerCase() == "true"
          ? true
          : data["Y-axis grid"].toLowerCase() == "false"
          ? false
          : null;
    if (data["Y-axis beginAtZero"])
      lineChartConfiguration["yaxis"]["beginAtZero"] =
        data["Y-axis beginAtZero"].toLowerCase() == "true"
          ? true
          : data["Y-axis beginAtZero"].toLowerCase() == "false"
          ? false
          : null;

    if (data["data"]) {
      let labels = data["data"].split("labels")[1];
      if (labels) {
        const startIndex = labels.indexOf("[");
        const endIndex = labels.lastIndexOf("]");

        const arrayString = labels.slice(startIndex, endIndex + 1);
        const jsonStr = arrayString.replace(/\s+/g, ",");
        const array = JSON.parse(jsonStr);
        lineChartConfiguration["xaxis"]["labels"] = array;
      }
    }

    for (i = 1; data[`DATASET${i}`] != null; i++) {
      let dataset = data[`DATASET${i}`].split(",");
      let jsonStr = dataset[1].replace(/\s+/g, ",");
      lineChartConfiguration.yaxis.datasets.push({
        label: dataset[0],
        data: JSON.parse(jsonStr),
        fill:
          dataset[2].toLowerCase() == "true"
            ? true
            : dataset[2].toLowerCase() == "false"
            ? false
            : null,
        color: dataset[3],
      });
    }

    return lineChartConfiguration;
  } catch (err) {
    return null;
  }
};
