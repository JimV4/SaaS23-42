function isNumber(input) {
  return !isNaN(input);
}

function isValidColorString(colorString) {
  const regex =
    /^((red|blue|black|purple|yellow|green|null)|(pink)|(rgb(a)?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*(\d*\.?\d+))?\s*\)))$/i;
  return regex.test(colorString);
}

/**
 * Generates a configuration object for a polar area chart based on the provided data.
 *
 * @param {Object} data - The data object containing the chart configuration.
 *
 * @returns {Object|null} The polar area chart configuration object, or null if the data is invalid.
 *
 * @throws {Error} If an error occurs during the configuration generation process.
 */
exports.getPolarAreaChartConfig = (data) => {
  try {
    const polarAreaChartConfiguration = {
      labels: [],
      scale: {
        datasets: [],
      },
    };

    if (data["width"]) {
      if (!isNumber(data["width"])) return null;
      polarAreaChartConfiguration["width"] = parseInt(data["width"]);
    }
    if (data["height"]) {
      if (!isNumber(data["height"])) return null;
      polarAreaChartConfiguration["height"] = parseInt(data["height"]);
    }
    if (data["title"]) polarAreaChartConfiguration["title"] = data["title"];

    if (data["displayAxis"]) {
      if (data["displayAxis"].toLowerCase() == "true")
        polarAreaChartConfiguration["scale"]["displayAxis"] = true;
      else if (data["displayAxis"].toLowerCase() == "false")
        polarAreaChartConfiguration["scale"]["displayAxis"] = false;
      else return null;
    }

    let labels = data["data"].split("labels")[1];

    const startIndex = labels.indexOf("[");
    const endIndex = labels.lastIndexOf("]");

    const arrayString = labels.slice(startIndex, endIndex + 1);
    const jsonStr = arrayString.replace(/\s+/g, ",");
    const array = JSON.parse(jsonStr);
    polarAreaChartConfiguration["labels"] = array;

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
      let backgroundColor = [];
      let borderColor = [];
      for (j = 1; j < pairs.length; ++j) {
        let xy = pairs[j].split(")");
        let r = parseInt(xy[0].split(" ")[0]);
        let back = xy[0].split(" ")[1] ? xy[0].split(" ")[1] : "null";
        let border = xy[0].split(" ")[2] ? xy[0].split(" ")[2] : "null";
        if (
          (r != 0 && !r) ||
          !isValidColorString(back) ||
          !isValidColorString(border)
        )
          return null;
        dataY.push(r);
        backgroundColor.push(back);
        borderColor.push(border);
      }

      polarAreaChartConfiguration.scale.datasets.push({
        label: dataset[0],
        data: dataY,
        backgroundColor,
        borderColor,
      });
      i++;
    }
    if (!hasDataset) return null;

    return polarAreaChartConfiguration;
  } catch (err) {
    return null;
  }
};
