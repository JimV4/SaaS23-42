function isValidScaleType(type) {
  return ["linear", "logarithmic", "category"].includes(type);
}

function isValidScalePosition(position) {
  return ["left", "right"].includes(position);
}

function isNumber(input) {
  return !isNaN(input);
}

exports.getLineChartConfig = (data) => {
  try {
    const lineChartConfiguration = {
      xaxis: {
        labels: [],
      },
      yaxis: {
        datasets: [],
      },
    };

    if (data["width"]) {
      if (!isNumber(data["width"])) return null;
      lineChartConfiguration["width"] = parseInt(data["width"]);
    }
    if (data["height"]) {
      if (!isNumber(data["height"])) return null;
      lineChartConfiguration["height"] = parseInt(data["height"]);
    }
    if (data["title"]) lineChartConfiguration["title"] = data["title"];
    if (data["X-axis title"])
      lineChartConfiguration["xaxis"]["title"] = data["X-axis title"];
    if (data["Y-axis title"])
      lineChartConfiguration["yaxis"]["title"] = data["Y-axis title"];
    if (data["X-axis grid"]) {
      if (data["X-axis grid"].toLowerCase() == "true")
        lineChartConfiguration["xaxis"]["grid"] = true;
      else if (data["X-axis grid"].toLowerCase() == "false")
        lineChartConfiguration["xaxis"]["grid"] = false;
      else return null;
    }
    if (data["Y-axis grid"]) {
      if (data["Y-axis grid"].toLowerCase() == "true")
        lineChartConfiguration["yaxis"]["grid"] = true;
      else if (data["Y-axis grid"].toLowerCase() == "false")
        lineChartConfiguration["yaxis"]["grid"] = false;
      else return null;
    }
    if (data["Y-axis beginAtZero"]) {
      if (data["Y-axis beginAtZero"].toLowerCase() == "true")
        lineChartConfiguration["yaxis"]["beginAtZero"] = true;
      else if (data["Y-axis beginAtZero"].toLowerCase() == "false")
        lineChartConfiguration["yaxis"]["beginAtZero"] = false;
      else return null;
    }
    if (data["Y-axis type"]) {
      if (!isValidScaleType(data["Y-axis type"].toLowerCase())) return null;
      lineChartConfiguration["yaxis"]["type"] = data["Y-axis type"];
    }
    if (data["Y-axis position"]) {
      if (!isValidScalePosition(data["Y-axis position"].toLowerCase()))
        return null;
      lineChartConfiguration["yaxis"]["position"] = data["Y-axis position"];
    }

    let labels = data["data"].split("labels")[1];

    const startIndex = labels.indexOf("[");
    const endIndex = labels.lastIndexOf("]");

    const arrayString = labels.slice(startIndex, endIndex + 1);
    const jsonStr = arrayString.replace(/\s+/g, ",");
    const array = JSON.parse(jsonStr);
    lineChartConfiguration["xaxis"]["labels"] = array;

    hasDataset = false;
    let i = 1;
    while (data[`DATASET${i}`] != null) {
      hasDataset = true;
      let dataset = data[`DATASET${i}`].split(",");
      let jsonStr = dataset[1].replace(/\s+/g, ",");
      lineChartConfiguration.yaxis.datasets.push({
        label: dataset[0],
        data: JSON.parse(jsonStr),
        fill: dataset[2].toLowerCase() == "fill" ? true : false,
        color: dataset[3],
      });
      i++;
    }
    if (!hasDataset) return null;

    return lineChartConfiguration;
  } catch (err) {
    return null;
  }
};
