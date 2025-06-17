import { articleBooleanFilterKeys } from "@/app/(client)/[locale]/(dashboard)/dashboard/articles/_utils/utils";
import { IArticleFilters } from "@/app/(client)/[locale]/(dashboard)/dashboard/articles/interface/article.interface";
import { filterInitialState } from "@/utils/filter";
import { objectToQuery } from "@/utils/query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IArticleFilterQuery {
  articleQuery: string;
  queryObject: IArticleFilters;
}

const initialState: IArticleFilterQuery = {
  articleQuery: "?",
  queryObject: filterInitialState,
};

const ArticleQuerySlice = createSlice({
  name: "ArticleQuerySlice",
  initialState,
  reducers: {
    setArticleFilterQuery(state, action: PayloadAction<IArticleFilters>) {
      const updatedQuery = action.payload;
      const [key] = Object.keys(updatedQuery) as (keyof IArticleFilters)[];

      // If it's a boolean filter key
      if (articleBooleanFilterKeys.includes(key)) {
        if (state.queryObject[key]) {
          delete state.queryObject[key];
        } else {
          state.queryObject = {
            ...state.queryObject,
            ...updatedQuery,
          };
        }
      } else {
        // For non-boolean filters, just assign
        state.queryObject = {
          ...state.queryObject,
          ...updatedQuery,
        };
      }

      // Update query string
      state.articleQuery = objectToQuery(state.queryObject);
    },
    removeSpecificFilterQuery(
      state,
      action: PayloadAction<keyof IArticleFilters>
    ) {
      const key = action.payload;

      if (key) {
        delete state.queryObject[key];
      }
    },

    clearArticleFilterQuery(state) {
      state.articleQuery = "?";
      state.queryObject = filterInitialState;
    },
  },
});

export const {
  setArticleFilterQuery,
  clearArticleFilterQuery,
  removeSpecificFilterQuery,
} = ArticleQuerySlice.actions;
const ArticleFilterQueryReducer = ArticleQuerySlice.reducer;
export default ArticleFilterQueryReducer;
