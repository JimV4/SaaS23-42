const mongoose = require("mongoose");

const storedChartsSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  storedCharts: {
    type: [
      {
        path: {
          type: String,
          required: true,
          unique: true,
        },
        title: {
          type: String,
          required: true,
          unique: true,
        },
        type: {
          type: String,
          required: true,
          unique: true,
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
