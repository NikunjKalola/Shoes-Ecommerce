const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
    required: true,
  },
  size: [mongoose.Schema.Types.Mixed],
  color: [String],
  description: { type: String, required: true },
  stock: Number,
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  imageSrc: String,
  images: [String],
  createdAt: {type: Date},
  modifiedAt: {type: Date},
  deleted: String
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

module.exports = mongoose.model("Product", schema);
