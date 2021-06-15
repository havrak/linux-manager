const mongoose = require("mongoose");

const { Schema } = mongoose;

const dataSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "User", required: true },
    name: { type: String },
    public_key: { type: String },
    logged_at: { type: Date, default: Date.now, immutable: true },
  },
  { versionKey: false }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
