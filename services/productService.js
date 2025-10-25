import Product from "../models/productModel.js";
import { AppError } from "../utils/errorHandler.js";

export const getProductsService = async () => {
  const products = await Product.find();
  return products.map((p) => ({
    id: p._id,
    name: p.name,
    img: p.img,
    category: p.category,
    price: p.price,
    description: p.description,
    isActive: p.isActive,
  }));
};

export const addProductService = async (data) => {
  const { name, img, category, price, description, isActive } = data;
  if (!name || !img || !category || !price) {
    throw new AppError("Missing required fields", 400);
  }

  const product = new Product({
    name,
    img,
    category,
    price,
    description,
    isActive,
  });
  const saved = await product.save();
  return {
    id: saved._id,
    name: saved.name,
    img: saved.img,
    category: saved.category,
    price: saved.price,
    description: saved.description,
    isActive: saved.isActive,
  };
};

export const updateProductService = async (id, data) => {
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError("Product not found", 404);
  return updated;
};

export const deleteProductService = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new AppError("Product not found", 404);
  return deleted;
};
