import { baseApi } from "./api/baseApi";
import cashingReducer from "./features/cashing/cashing.slice";
import gadgetCashingReducer from "./features/cashing/cashing.slice";
import articleFilterQueryReducer from "./features/filter/article.filter";
import gadgetFilterQueryReducer from "./features/filter/gadget.filter";
import navSliceReducer from "./features/nav-states/nav-slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  navSlice: navSliceReducer,
  querySlice: articleFilterQueryReducer,
  cashSlice: cashingReducer,
  gadgetQuerySlice: gadgetFilterQueryReducer,
  articleQuerySlice: articleFilterQueryReducer,
  gadgetCashingReducer: gadgetCashingReducer,
};

export default rootReducer;
