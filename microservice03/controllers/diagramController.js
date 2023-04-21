const fs = require("fs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

// Define the width and height of the canvas
const width = 1000;
const height = 1000;

// Define the chart configuration
const configuration = {
  type: "line", // type of chart (e.g., line, bar, pie)
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: false,
  },
};

exports.createDiagram = async (req, res, next) => {
  try {
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
