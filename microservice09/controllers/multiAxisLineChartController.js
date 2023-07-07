function isValidScaleType(type) {
  return ["linear", "logarithmic", "category"].includes(type);
}

function isValidScalePosition(position) {
  return ["left", "right"].includes(position);
}

function isNumber(input) {
  return !isNaN(input);
}

function isYFormat(input) {
  return /^y\d*$/.test(input);
}

function isValidColorString(colorString) {
  const regex =
    /^((red|blue|black|purple|yellow|green)|(pink)|(rgb(a)?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*(\d*\.?\d+))?\s*\)))$/i;
  return regex.test(colorString);
}

/**
 * Generates a configuration object for a multi-axis line chart based on the provided data.
 *
 * @param {Object} data - The data object containing the chart configuration.
 *
 * @returns {Object|null} The multi-axis line chart configuration object, or null if the data is invalid.
 *
 * @throws {Error} If an error occurs during the configuration generation process.
 */
exports.getMultiAxisLineChartConfig = (data) => {
  try {
    const multiAxisLineChartConfiguration = {
      xaxis: {
        labels: [],
      },
      yaxis: {
        datasets: [],
        axis: [],
      },
    };

    if (data["width"]) {
      if (!isNumber(data["width"])) return null;
      multiAxisLineChartConfiguration["width"] = parseInt(data["width"]);
    }
    if (data["height"]) {
      if (!isNumber(data["height"])) return null;
      multiAxisLineChartConfiguration["height"] = parseInt(data["height"]);
    }
    if (data["title"]) multiAxisLineChartConfiguration["title"] = data["title"];
    if (data["X-axis title"])
      multiAxisLineChartConfiguration["xaxis"]["title"] = data["X-axis title"];

    let i = 0;

    while (data[i == 0 ? "Y-axis title" : `Y${i}-axis title`] != null) {
      multiAxisLineChartConfiguration["yaxis"]["axis"].push({
        title: data[i == 0 ? "Y-axis title" : `Y${i}-axis title`],
      });
      i++;
    }

    if (data["X-axis grid"]) {
      if (data["X-axis grid"].toLowerCase() == "true")
        multiAxisLineChartConfiguration["xaxis"]["grid"] = true;
      else if (data["X-axis grid"].toLowerCase() == "false")
        multiAxisLineChartConfiguration["xaxis"]["grid"] = false;
      else return null;
    }

    i = 0;
    while (data[i == 0 ? "Y-axis grid" : `Y${i}-axis grid`]) {
      if (
        data[i == 0 ? "Y-axis grid" : `Y${i}-axis grid`].toLowerCase() == "true"
      )
        multiAxisLineChartConfiguration["yaxis"]["axis"][i]["grid"] = true;
      else if (
        data[i == 0 ? "Y-axis grid" : `Y${i}-axis grid`].toLowerCase() ==
        "false"
      )
        multiAxisLineChartConfiguration["yaxis"]["axis"][i]["grid"] = false;
      else return null;
      i++;
    }

    i = 0;
    while (data[i == 0 ? "Y-axis beginAtZero" : `Y${i}-axis beginAtZero`]) {
      if (
        data[
          i == 0 ? "Y-axis beginAtZero" : `Y${i}-axis beginAtZero`
        ].toLowerCase() == "true"
      )
        multiAxisLineChartConfiguration["yaxis"]["axis"][i][
          "beginAtZero"
        ] = true;
      else if (
        data[
          i == 0 ? "Y-axis beginAtZero" : `Y${i}-axis beginAtZero`
        ].toLowerCase() == "false"
      )
        multiAxisLineChartConfiguration["yaxis"]["axis"][i][
          "beginAtZero"
        ] = false;
      else return null;
      i++;
    }

    i = 0;
    while (data[i == 0 ? "Y-axis type" : `Y${i}-axis type`]) {
      if (
        !isValidScaleType(
          data[i == 0 ? "Y-axis type" : `Y${i}-axis type`].toLowerCase()
        )
      )
        return null;
      multiAxisLineChartConfiguration["yaxis"]["axis"][i]["type"] =
        data[i == 0 ? "Y-axis type" : `Y${i}-axis type`];
      i++;
    }

    i = 0;
    while (data[i == 0 ? "Y-axis position" : `Y${i}-axis position`]) {
      if (
        !isValidScalePosition(
          data[i == 0 ? "Y-axis position" : `Y${i}-axis position`].toLowerCase()
        )
      )
        return null;
      multiAxisLineChartConfiguration["yaxis"]["axis"][i]["position"] =
        data[i == 0 ? "Y-axis position" : `Y${i}-axis position`];
      i++;
    }

    let labels = data["data"].split("labels")[1];

    const startIndex = labels.indexOf("[");
    const endIndex = labels.lastIndexOf("]");

    const arrayString = labels.slice(startIndex, endIndex + 1);
    const jsonStr = arrayString.replace(/\s+/g, ",");
    const array = JSON.parse(jsonStr);
    multiAxisLineChartConfiguration["xaxis"]["labels"] = array;

    hasDataset = false;
    i = 1;
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
      let fill = dataset[2].split("/")[0];
      let fillColor = dataset[2].split("/")[1];
      if (!isValidColorString(dataset[3]) && dataset[3] != "") return null;
      if (!isYFormat(dataset[4])) return null;
      if (fillColor && !isValidColorString(fillColor)) return null;
      if (fill.toLowerCase() == "fill") fill = true;
      else if (fill == "") fill = false;
      else return null;

      multiAxisLineChartConfiguration.yaxis.datasets.push({
        label: dataset[0],
        data: dataY,
        fill: fill,
        borderColor: dataset[3],
        fillColor: fillColor,
        yAxisID: dataset[4],
      });
      i++;
    }
    if (!hasDataset) return null;

    return multiAxisLineChartConfiguration;
  } catch (err) {
    return null;
  }
};
