const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
  type: { type: String, required: true },
  orgId: { type: String },
  username: { type: String },
  name: { type: String, required: true },
  ranking: { type: Number, default: 0 },
  photo: { type: String },
  category: { type: String },
  subCategory: [String],
  rating: { type: Number, default: 0 },
  totalAppointment: { type: Number, default: 0 },
  zone: [String],
  branch: [String],
  areaOfPractice: { type: String },
});

module.exports = mongoose.model("Professional", ProfessionalSchema);
