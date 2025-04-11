import { baseApi } from "./api/baseApi";
import navSliceReducer from "./features/nav-states/nav-slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  navSlice: navSliceReducer,
};

export default rootReducer;
