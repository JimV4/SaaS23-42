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
        message: "The file you uploaded contains errors!",
      });
    }

    const width = req.body.width ? req.body.width : 1000;
    const height = req.body.height ? req.body.height : 500;

    const datasets = [];
    for (i = 0; i < req.body.yaxis.datasets.length; i++) {
      if (!req.body.yaxis.datasets[i].data) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }

      lineColor = req.body.yaxis.datasets[i].color
        ? req.body.yaxis.datasets[i].color
        : getRandomRGBColor();

      datasets.push({
        label: req.body.yaxis.datasets[i].label
          ? req.body.yaxis.datasets[i].label
          : `Dataset ${i + 1}`,
        data: req.body.yaxis.datasets[i].data,
        fill: req.body.yaxis.datasets[i].fill ? true : false,
        borderColor: lineColor, // Line color
        borderWidth: 1,
        backgroundColor: lineColor, // Background color
        pointBackgroundColor: lineColor, // Data point background color
        pointBorderColor: lineColor, // Data point border color
      });
    }

    // Define the chart configuration
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
        scales: {
          x: {
            display: true, // Show x-axis
            title: {
              display: req.body.xaxis.title ? true : false,
              text: req.body.xaxis.title,
            },
            ticks: {
              font: {
                size: 12,
                weight: "bold",
              },
              maxRotation: 90, // Rotate x-axis labels by 90 degrees
            },
            grid: {
              display: req.body.xaxis.grid ? true : false, // Show x-axis grid lines
            },
          },
          y: {
            beginAtZero: req.body.yaxis.beginAtZero ? true : false, // Start y-axis at zero
            display: true, // Show y-axis
            title: {
              display: req.body.yaxis.title ? true : false,
              text: req.body.yaxis.title,
            },
            ticks: {
              font: {
                size: 12,
                weight: "bold",
              },
            },
            grid: {
              display: req.body.yaxis.grid ? true : false, // Show y-axis grid lines
            },
          },
        },
      },
    };

    // Create a chart node canvas instance
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    // Render the chart to a buffer
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    fs.writeFile(`${__dirname}/../charts/chart.png`, image, async (err) => {
      if (err) {
        // Handle error if needed
        console.error(err);
        return res.status(500).send("Failed to save image");
      }

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": image.length,
      });

      res.end(image, "binary");
    });
  } catch (error) {
    // Handle any errors that occur during chart creation
    console.error("Error creating chart image:", error);
    res.status(500).send("Internal Server Error");
  }
};
