const mongoose = require("mongoose");

const storedChartsSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "The email is needed here."],
    required: true,
  },
  storedCharts: {
    type: [
      {
        imageURL: {
          type: String,
          required: [true, "The imageURL is needed."],
        },
        title: {
          type: String,
          required: [true, "The title of the chart is needed."],
        },
        type: {
          type: String,
          required: [true, "The type of the chart is needed."],
        },
        createdOn: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    default: [],
  },
});

const StoredCharts = mongoose.model("StoredCharts", storedChartsSchema);

module.exports = StoredCharts;
