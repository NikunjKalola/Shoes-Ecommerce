const mongoose = require("mongoose");

const schema = mongoose.Schema({
  items: { type: [mongoose.Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "pending" },
  selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: {type: Date},
  modifiedAt: {type: Date},
});

const virtual = schema.virtual("id");
virtual.get(function () {
  return this._id;
});
schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Order", schema);
