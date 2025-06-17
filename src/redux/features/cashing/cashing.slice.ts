import { Category, GadgetBrand, GadgetType } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GadgetCache {
  typesCash: GadgetType[];
  brandCash: GadgetBrand[];
}

interface ArticleCache {
  categoryCash: Category[];
}

interface CacheState {
  gadget: GadgetCache;
  article: ArticleCache;
}

const initialState: CacheState = {
  gadget: {
    brandCash: [],
    typesCash: [],
  },
  article: {
    categoryCash: [],
  },
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setGadgetCache(state, action: PayloadAction<Partial<GadgetCache>>) {
      state.gadget = {
        ...state.gadget,
        ...action.payload,
      };
    },
    setArticleCache(state, action: PayloadAction<Partial<ArticleCache>>) {
      state.article = {
        ...state.article,
        ...action.payload,
      };
    },
  },
});

export const { setGadgetCache, setArticleCache } = cacheSlice.actions;
export default cacheSlice.reducer;
