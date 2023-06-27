const mongoose = require("mongoose");

const quotasSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "This email is already in use."],
    required: [true, "The email is needed here."],
  },
  quotas: {
    type: Number,
    default: 0,
  },
});

const Quotas = mongoose.model("Quotas", quotasSchema);

module.exports = Quotas;
