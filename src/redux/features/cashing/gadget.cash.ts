import { GadgetBrand, GadgetType } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGadgetCash {
  typesCash?: GadgetType[];
  brandCash?: GadgetBrand[];
}

const initialState: IGadgetCash = {
  typesCash: [],
  brandCash: [],
};

const gadgetCashSlice = createSlice({
  name: "gadgetCashSlice",
  initialState,
  reducers: {
    setGadgetCashing(state, action: PayloadAction<IGadgetCash>) {
      const data = action.payload;
      state.brandCash = data.brandCash;
      state.typesCash = data.typesCash;
    },
  },
});

export const { setGadgetCashing } = gadgetCashSlice.actions;
const gadgetCashingReducer = gadgetCashSlice.reducer;
export default gadgetCashingReducer;
