import { ArticleController } from "./../../_modules/article/article.controller";

export const POST = ArticleController.createArticle;

export const PATCH = ArticleController.updateArticle;

export const DELETE = ArticleController.deleteArticle;
