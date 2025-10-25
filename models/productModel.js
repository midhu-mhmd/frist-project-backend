import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Product", productSchema);
