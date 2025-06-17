import { IArticleFilters } from "@/app/(client)/[locale]/(dashboard)/dashboard/articles/_interface/article.interface";
import { IGadgetFilters } from "@/app/(client)/[locale]/(dashboard)/dashboard/gadget/_interface/gadget.interface";

export const filterInitialState: IArticleFilters | IGadgetFilters = {
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 10,
};
