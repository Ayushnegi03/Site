
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: Number, 
      enum: [0, 1], 
      default: 0, 
    },
    name: {
      type: String,
    },
    contact: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
dataSchema.methods.isAdmin = function () {
  return this.role === 1; 
};
dataSchema.pre("save", async function (next) {
  if (this.role === 1) {
    const existingAdmin = await mongoose.models.users.findOne({ role: 1 });
    if (existingAdmin && existingAdmin._id.toString() !== this._id.toString()) {
      const error = new Error("Only one admin is allowed.");
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("users", dataSchema);
