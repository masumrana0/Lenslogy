import { baseApi } from "./api/baseApi";
import gadgetCashingReducer from "./features/cashing/gadget.cash";
import articleFilterQueryReducer from "./features/filter/article.filter";
import gadgetFilterQueryReducer from "./features/filter/gadget.filter";
import navSliceReducer from "./features/nav-states/nav-slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  navSlice: navSliceReducer,
  querySlice: articleFilterQueryReducer,
  gadgetQuerySlice: gadgetFilterQueryReducer,
  gadgetCashingReducer: gadgetCashingReducer,
};

export default rootReducer;
