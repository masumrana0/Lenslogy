import status from "http-status";
import sendResponse from "../../_core/shared/api-response";
import catchAsync from "../../_core/shared/catch-async";
import { ArticleService } from "./article.service";

const createArticle = catchAsync(async (req: Request) => {
  const result = await ArticleService.createArticle(req);
  return sendResponse({
    statusCode: status.CREATED,
    message: "Article created successfully",
    data: result,
  });
});

const updateArticle = catchAsync(async (req: Request) => {
  const result = await ArticleService.updateArticle(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Article updated successfully",
    data: result,
  });
});

const deleteArticle = catchAsync(async (req: Request) => {
  const result = await ArticleService.deleteArticle(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Article deleted successfully",
    data: result,
  });
});

const getAllArticle = catchAsync(async (req: Request) => {
  const result = await ArticleService.getAllArticle(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Article retrieved successfully",
    data: result,
  });
});

const getOneArticle = catchAsync(async (req: Request) => {
  const result = await ArticleService.getOneArticle(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Article retrieved successfully",
    data: result,
  });
});

const getForHomePage = catchAsync(async (req: Request) => {
  const result = await ArticleService.getForHomePage(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Home articles retrieved successfully",
    data: result,
  });
});

const getForNavbar = catchAsync(async (req: Request) => {
  console.log("getForNavbar");
  const result = await ArticleService.getForNavbar(req);
  return sendResponse({
    statusCode: status.OK,
    message: "Navbar articles retrieved successfully",
    data: result,
  });
});

export const ArticleController = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticle,
  getForHomePage,
  getForNavbar,
  getOneArticle,
};
