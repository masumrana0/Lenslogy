// import status from "http-status";
// import sendResponse from "../../_essentials/shared/api-response";
// import catchAsync from "../../_essentials/shared/catchAsync";
// import { CategoryService } from "./category.service";

// const createCategory = catchAsync(async (req: Request) => {
//   const result = await CategoryService.createCategory(req);

//   return sendResponse({
//     statusCode: status.CREATED,
//     message: "Category created done",
//     data: result,
//   });
// });

// export const CategoryController = {
//   createCategory,
// };
