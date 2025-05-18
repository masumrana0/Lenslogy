import { baseApi } from "./api/baseApi";
import articleFilterQueryReducer from "./features/filter/article.filter";
import navSliceReducer from "./features/nav-states/nav-slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  navSlice: navSliceReducer,
  querySlice: articleFilterQueryReducer,
};

export default rootReducer;
