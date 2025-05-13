import status from "http-status";
import { CategoryService } from "./category.service";
import catchAsync from "../../_core/shared/catch-async";
import sendResponse from "../../_core/shared/api-response";

const createCategory = catchAsync(async (req: Request) => {
  const result = await CategoryService.createCategory(req);

  return sendResponse({
    statusCode: status.CREATED,
    message: "Category created done",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request) => {
  const result = await CategoryService.updateCategory(req);

  return sendResponse({
    statusCode: status.OK,
    message: "Category updated done",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request) => {
  const result = await CategoryService.getAllCategory(req);

  return sendResponse({
    statusCode: status.OK,
    message: "Category Fetched done",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request) => {
  const result = await CategoryService.deleteCategory(req);

  return sendResponse({
    statusCode: status.OK,
    message: "Category delete successful",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};
