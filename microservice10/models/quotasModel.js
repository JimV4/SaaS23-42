const mongoose = require("mongoose");

const quotasSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  quotas: {
    type: Number,
    default: 0,
  },
});

const Quotas = mongoose.model("Quotas", quotasSchema);

module.exports = Quotas;
