import { objectToQuery } from "@/utils/query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IArticleFilterQuery {
  articleQuery: string;
  queryObject: Record<string, any>;
}

const initialState: IArticleFilterQuery = {
  articleQuery: "?",
  queryObject: {},
};

const articleQuerySlice = createSlice({
  name: "querySlice",
  initialState,
  reducers: {
    setArticleFilterQuery(state, action: PayloadAction<Record<string, any>>) {
      const queryObject = action.payload;
      const query = objectToQuery(queryObject);
      state.queryObject = queryObject;
      state.articleQuery = query;
    },
    clearFilterQuery(state) {
      state.articleQuery = "?";
    },
  },
});

export const { setArticleFilterQuery, clearFilterQuery } =
  articleQuerySlice.actions;
const articleFilterQueryReducer = articleQuerySlice.reducer;
export default articleFilterQueryReducer;
