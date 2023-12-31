const fs = require("fs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

exports.createDiagram = async (req, res, next) => {
  try {
    if (
      !req.body.xaxis ||
      !req.body.yaxis ||
      !req.body.xaxis.labels ||
      !req.body.yaxis.datasets
    ) {
      return res.status(400).json({
        status: "failed",
        message: "The configuration you uploaded contains errors!",
      });
    }

    const width = req.body.width ? req.body.width : 1000;
    const height = req.body.height ? req.body.height : 500;

    let scales = {
      x: {
        display: true,
        title: {
          display: req.body.xaxis.title ? true : false,
          text: req.body.xaxis.title,
        },
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          maxRotation: 90,
        },
        grid: {
          display: req.body.xaxis.grid ? true : false,
        },
      },
    };

    const datasets = [];
    for (i = 0; i < req.body.yaxis.datasets.length; i++) {
      if (
        !req.body.yaxis.datasets[i].data ||
        !req.body.yaxis.datasets[i].yAxisID
      ) {
        return res.status(400).json({
          status: "failed",
          message: "The configuration you uploaded contains errors!",
        });
      }

      lineColor = req.body.yaxis.datasets[i].borderColor
        ? req.body.yaxis.datasets[i].borderColor
        : getRandomRGBColor();

      fillColor = req.body.yaxis.datasets[i].fillColor
        ? req.body.yaxis.datasets[i].fillColor
        : getRandomRGBColor();

      datasets.push({
        label: req.body.yaxis.datasets[i].label
          ? req.body.yaxis.datasets[i].label
          : `Dataset ${i + 1}`,
        data: req.body.yaxis.datasets[i].data,
        fill: req.body.yaxis.datasets[i].fill ? true : false,
        borderColor: lineColor,
        borderWidth: 1,
        backgroundColor: req.body.yaxis.datasets[i].fill
          ? fillColor
          : lineColor,
        pointBackgroundColor: lineColor,
        pointBorderColor: lineColor,
        yAxisID: req.body.yaxis.datasets[i].yAxisID,
      });
    }

    for (i = 0; i < req.body.yaxis.axis.length; i++) {
      scales[i == 0 ? "y" : `y${i}`] = {
        type: req.body.yaxis.axis[i].type
          ? req.body.yaxis.axis[i].type
          : "linear",
        position: req.body.yaxis.axis[i].position
          ? req.body.yaxis.axis[i].position
          : "left",
        beginAtZero: req.body.yaxis.axis[i].beginAtZero ? true : false,
        display: true,
        title: {
          display: req.body.yaxis.axis[i].title ? true : false,
          text: req.body.yaxis.axis[i].title,
        },
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
        grid: {
          display: req.body.yaxis.axis[i].grid ? true : false,
        },
      };
    }

    const configuration = {
      type: "line",
      data: {
        labels: req.body.xaxis.labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: req.body.title ? true : false,
            text: req.body.title,
          },
        },
        scales: scales,
      },
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    const dataURL = `data:image/png;base64,${image.toString("base64")}`;
    res.status(200).json({
      image: dataURL,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
