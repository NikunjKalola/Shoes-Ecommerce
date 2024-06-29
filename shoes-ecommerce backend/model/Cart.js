const mongoose = require("mongoose");

const schema = mongoose.Schema({
  quantity: { type: Number, required: true },
  size:{type:Number,required:true},
  color: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true,unique:true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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

module.exports = mongoose.model("Cart", schema);
