import { CategoryController } from "../../_modules/category/category.controller";

export const POST = CategoryController.createCategory;

export const PATCH = CategoryController.updateCategory;

export const DELETE = CategoryController.deleteCategory;

export const GET = CategoryController.getAllCategory;
