import * as productService from "../services/productService.js";

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProductsService();
  res.status(200).json(products);
});

export const addProduct = catchAsync(async (req, res) => {
  const product = await productService.addProductService(req.body);
  res.status(201).json(product);
});

export const updateProduct = catchAsync(async (req, res) => {
  const updated = await productService.updateProductService(
    req.params.id,
    req.body
  );
  res.status(200).json(updated);
});

export const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductService(req.params.id);
  res.status(200).json({ message: "Product deleted successfully" });
});
