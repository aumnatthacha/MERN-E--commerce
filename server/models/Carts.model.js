const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CartItemSchema = new Schema(
  {

    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);
const CartModel = model("Carts", CartItemSchema);
module.exports = CartModel;