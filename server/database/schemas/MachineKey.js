const mongoose = require("mongoose");

const { Schema } = mongoose;

const machineKeySchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "User", required: true },
    name: { type: String },
    key: { type: String },
    created_at: { type: Date, default: Date.now, immutable: true },
  },
  { versionKey: false }
);

const MachineKey = mongoose.model("MachineKey", machineKeySchema);

module.exports = MachineKey;
