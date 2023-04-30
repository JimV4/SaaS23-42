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

exports.getRadarChartConfig = (data) => {
  try {
    const radarChartConfiguration = {
      labels: [],
      scale: {
        datasets: [],
      },
    };

    if (data["width"]) {
      if (!isNumber(data["width"])) return null;
      radarChartConfiguration["width"] = parseInt(data["width"]);
    }
    if (data["height"]) {
      if (!isNumber(data["height"])) return null;
      radarChartConfiguration["height"] = parseInt(data["height"]);
    }
    if (data["title"]) radarChartConfiguration["title"] = data["title"];

    if (data["displayAxis"]) {
      if (data["displayAxis"].toLowerCase() == "true")
        radarChartConfiguration["scale"]["displayAxis"] = true;
      else if (data["displayAxis"].toLowerCase() == "false")
        radarChartConfiguration["scale"]["displayAxis"] = false;
      else return null;
    }

    if (data["displayAngleLines"]) {
      if (data["displayAngleLines"].toLowerCase() == "true")
        radarChartConfiguration["scale"]["displayAngle"] = true;
      else if (data["displayAngleLines"].toLowerCase() == "false")
        radarChartConfiguration["scale"]["displayAngle"] = false;
      else return null;
    }

    let labels = data["data"].split("labels")[1];

    const startIndex = labels.indexOf("[");
    const endIndex = labels.lastIndexOf("]");

    const arrayString = labels.slice(startIndex, endIndex + 1);
    const jsonStr = arrayString.replace(/\s+/g, ",");
    const array = JSON.parse(jsonStr);
    radarChartConfiguration["labels"] = array;

    hasDataset = false;
    let i = 1;
    while (data[`DATASET${i}`] != null) {
      hasDataset = true;
      let dataset = data[`DATASET${i}`].split(",");
      let jsonStr = dataset[1].replace(/\s+/g, ",");
      let fill = dataset[2].split("/")[0];
      let fillColor = dataset[2].split("/")[1];
      if (!isValidColorString(dataset[3]) && dataset[3] != "") return null;
      if (fillColor && !isValidColorString(fillColor)) return null;
      if (fill.toLowerCase() == "fill") fill = true;
      else if (fill == "") fill = false;
      else return null;

      radarChartConfiguration.scale.datasets.push({
        label: dataset[0],
        data: JSON.parse(jsonStr),
        fill: fill,
        borderColor: dataset[3],
        fillColor: fillColor,
      });
      i++;
    }
    if (!hasDataset) return null;

    return radarChartConfiguration;
  } catch (err) {
    return null;
  }
};
