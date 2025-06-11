import status from "http-status";
import sendResponse from "../../_core/shared/api-response";
import catchAsync from "../../_core/shared/catch-async";
import { gadgetService } from "./gadget.service";

const createGadget = catchAsync(async (req: Request) => {
  const result = await gadgetService.createGadget(req);
  return sendResponse({
    statusCode: status.CREATED,
    message: "Article created successfully",
    data: result,
  });
});

// const updateArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.updateArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article updated successfully",
//     data: result,
//   });
// });

// const deleteArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.deleteArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article deleted successfully",
//     data: result,
//   });
// });

// // for admin
// const getAllArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getAllArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article retrieved successfully",
//     data: result,
//   });
// });

// // get all featured article
// const getAllFeaturedArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getAllFeaturedArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article retrieved successfully",
//     data: result,
//   });
// });

// // get all Latest article
// const getAllLatestArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getAllFeaturedArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article retrieved successfully",
//     data: result,
//   });
// });

// const getOneArticle = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getOneArticle(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Article retrieved successfully",
//     data: result,
//   });
// });

// const getForHomePage = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getForHomePage(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Home articles retrieved successfully",
//     data: result,
//   });
// });

// const getForNavbar = catchAsync(async (req: Request) => {
//   const result = await ArticleService.getForNavbar(req);
//   return sendResponse({
//     statusCode: status.OK,
//     message: "Navbar articles retrieved successfully",
//     data: result,
//   });
// });

export const GadgetController = {
  createGadget,
};
