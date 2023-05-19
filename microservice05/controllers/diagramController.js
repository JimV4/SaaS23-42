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
    if (!req.body.labels || !req.body.scale || !req.body.scale.datasets) {
      return res.status(400).json({
        status: "failed",
        message: "The configuration you uploaded contains errors!",
      });
    }

    const width = req.body.width ? req.body.width : 1000;
    const height = req.body.height ? req.body.height : 500;

    const datasets = [];
    for (i = 0; i < req.body.scale.datasets.length; i++) {
      if (!req.body.scale.datasets[i].data) {
        return res.status(400).json({
          status: "failed",
          message: "The configuration you uploaded contains errors!",
        });
      }

      lineColor = req.body.scale.datasets[i].borderColor
        ? req.body.scale.datasets[i].borderColor
        : getRandomRGBColor();

      fillColor = req.body.scale.datasets[i].fillColor
        ? req.body.scale.datasets[i].fillColor
        : getRandomRGBColor();

      datasets.push({
        label: req.body.scale.datasets[i].label
          ? req.body.scale.datasets[i].label
          : `Dataset ${i + 1}`,
        data: req.body.scale.datasets[i].data,
        fill: req.body.scale.datasets[i].fill ? true : false,
        borderColor: lineColor,
        borderWidth: 1,
        backgroundColor: req.body.scale.datasets[i].fill
          ? fillColor
          : lineColor,
        pointBackgroundColor: lineColor,
        pointBorderColor: lineColor,
      });
    }

    const configuration = {
      type: "radar",
      data: {
        labels: req.body.labels,
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
        scales: {
          r: {
            ticks: {
              backdropColor: "transparent",
              display: req.body.scale.displayAxis ? true : false,
            },
            angleLines: {
              color: req.body.scale.displayAngle ? "black" : null,
            },
          },
        },
      },
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    res.set("Content-Type", "image/png");
    res.send(image);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
