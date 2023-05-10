function isValidScaleType(type) {
  return ["linear", "logarithmic", "category"].includes(type);
}

function isValidScalePosition(position) {
  return ["left", "right"].includes(position);
}

function isNumber(input) {
  return !isNaN(input);
}

function isValidColorString(colorString) {
  const regex =
    /^((red|blue|black|purple|yellow)|(pink)|(rgb(a)?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*(\d*\.?\d+))?\s*\)))$/i;
  return regex.test(colorString);
}

exports.getScatterChartConfig = (data) => {
  try {
    const scatterChartConfiguration = {
      xaxis: {
        labels: [],
      },
      yaxis: {
        datasets: [],
      },
    };

    if (data["width"]) {
      if (!isNumber(data["width"])) return null;
      scatterChartConfiguration["width"] = parseInt(data["width"]);
    }
    if (data["height"]) {
      if (!isNumber(data["height"])) return null;
      scatterChartConfiguration["height"] = parseInt(data["height"]);
    }
    if (data["title"]) scatterChartConfiguration["title"] = data["title"];
    if (data["X-axis title"])
      scatterChartConfiguration["xaxis"]["title"] = data["X-axis title"];
    if (data["Y-axis title"])
      scatterChartConfiguration["yaxis"]["title"] = data["Y-axis title"];
    if (data["X-axis grid"]) {
      if (data["X-axis grid"].toLowerCase() == "true")
        scatterChartConfiguration["xaxis"]["grid"] = true;
      else if (data["X-axis grid"].toLowerCase() == "false")
        scatterChartConfiguration["xaxis"]["grid"] = false;
      else return null;
    }
    if (data["Y-axis grid"]) {
      if (data["Y-axis grid"].toLowerCase() == "true")
        scatterChartConfiguration["yaxis"]["grid"] = true;
      else if (data["Y-axis grid"].toLowerCase() == "false")
        scatterChartConfiguration["yaxis"]["grid"] = false;
      else return null;
    }
    if (data["Y-axis beginAtZero"]) {
      if (data["Y-axis beginAtZero"].toLowerCase() == "true")
        scatterChartConfiguration["yaxis"]["beginAtZero"] = true;
      else if (data["Y-axis beginAtZero"].toLowerCase() == "false")
        scatterChartConfiguration["yaxis"]["beginAtZero"] = false;
      else return null;
    }
    if (data["Y-axis type"]) {
      if (!isValidScaleType(data["Y-axis type"].toLowerCase())) return null;
      scatterChartConfiguration["yaxis"]["type"] = data["Y-axis type"];
    }
    if (data["Y-axis position"]) {
      if (!isValidScalePosition(data["Y-axis position"].toLowerCase()))
        return null;
      scatterChartConfiguration["yaxis"]["position"] = data["Y-axis position"];
    }

    let labels = data["data"].split("labels")[1];

    const startIndex = labels.indexOf("[");
    const endIndex = labels.lastIndexOf("]");

    const arrayString = labels.slice(startIndex, endIndex + 1);
    const jsonStr = arrayString.replace(/\s+/g, ",");
    const array = JSON.parse(jsonStr);
    scatterChartConfiguration["xaxis"]["labels"] = array;

    hasDataset = false;
    let i = 1;
    while (data[`DATASET${i}`] != null) {
      hasDataset = true;
      let dataset = data[`DATASET${i}`].split(",");
      const startIndex = dataset[1].indexOf("[") + 1;
      const endIndex = dataset[1].lastIndexOf("]") - 1;

      let pairs = dataset[1].slice(startIndex, endIndex + 1);
      pairs = pairs.split("(");
      let dataY = [];
      for (j = 1; j < pairs.length; ++j) {
        let xy = pairs[j].split(")");
        let x = parseInt(xy[0].split(" ")[0]);
        let y = parseInt(xy[0].split(" ")[1]);
        if (!array.includes(x) || !y) return null;
        dataY.push({
          x,
          y,
        });
      }
      let fillColor = dataset[2];
      if (!isValidColorString(dataset[3]) && dataset[3] != "") return null;
      if (fillColor && !isValidColorString(fillColor)) return null;

      scatterChartConfiguration.yaxis.datasets.push({
        label: dataset[0],
        data: dataY,
        borderColor: dataset[3],
        fillColor: fillColor,
      });
      i++;
    }
    if (!hasDataset) return null;

    return scatterChartConfiguration;
  } catch (err) {
    return null;
  }
};
