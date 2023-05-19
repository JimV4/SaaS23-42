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

      for (j = 0; j < req.body.scale.datasets[i].backgroundColor.length; ++j) {
        if (req.body.scale.datasets[i].backgroundColor[j] == "null")
          req.body.scale.datasets[i].backgroundColor[j] = getRandomRGBColor();

        if (req.body.scale.datasets[i].borderColor[j] == "null")
          req.body.scale.datasets[i].borderColor[j] =
            req.body.scale.datasets[i].backgroundColor[j];
      }

      datasets.push({
        label: req.body.scale.datasets[i].label
          ? req.body.scale.datasets[i].label
          : `Dataset ${i + 1}`,
        data: req.body.scale.datasets[i].data,
        backgroundColor: req.body.scale.datasets[i].backgroundColor,
        borderColor: req.body.scale.datasets[i].borderColor,
      });
    }

    const configuration = {
      type: "polarArea",
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
