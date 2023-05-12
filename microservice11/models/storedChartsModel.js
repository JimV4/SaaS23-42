const mongoose = require("mongoose");

const storedChartsSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  storedCharts: {
    type: [String],
    default: [],
  },
});

const StoredCharts = mongoose.model("StoredCharts", storedChartsSchema);

module.exports = StoredCharts;
