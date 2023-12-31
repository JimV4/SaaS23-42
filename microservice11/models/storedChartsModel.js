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
        imageURL: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        createdOn: {
          type: Date,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const StoredCharts = mongoose.model("StoredCharts", storedChartsSchema);

module.exports = StoredCharts;
