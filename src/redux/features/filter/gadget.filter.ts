import { IGadgetFilters } from "@/app/(client)/[locale]/(dashboard)/dashboard/gadget/_interface/gadget.interface";
import {
  gadgetBooleanFilterKeys,
  gadgetFilterInitialState,
} from "@/app/(client)/[locale]/(dashboard)/dashboard/gadget/_utils/gadget.utils";
import { objectToQuery } from "@/utils/query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGadgetFilterQuery {
  gadgetQuery: string;
  queryObject: IGadgetFilters;
}

const initialState: IGadgetFilterQuery = {
  gadgetQuery: "?",
  queryObject: gadgetFilterInitialState,
};

const gadgetQuerySlice = createSlice({
  name: "gadgetQuerySlice",
  initialState,
  reducers: {
    setGadgetFilterQuery(state, action: PayloadAction<IGadgetFilters>) {
      const updatedQuery = action.payload;

      // Get the key being toggled (should be only one key in updatedQuery)
      const [key] = Object.keys(updatedQuery) as (keyof IGadgetFilters)[];
      const value = updatedQuery[key];

      // If it's a boolean filter key
      if (gadgetBooleanFilterKeys.includes(key as string)) {
        if (state.queryObject[key]) {
          // Already exists → toggle off by deleting
          delete state.queryObject[key];
        } else {
          // Doesn't exist → toggle on
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
      state.gadgetQuery = objectToQuery(state.queryObject);
    },
    removeSpecificFilterQuery(
      state,
      action: PayloadAction<keyof IGadgetFilters>
    ) {
      const key = action.payload;

      if (key) {
        delete state.queryObject[key];
      }
    },

    clearGadgetFilterQuery(state) {
      state.gadgetQuery = "?";
      state.queryObject = gadgetFilterInitialState;
    },
  },
});

export const {
  setGadgetFilterQuery,
  clearGadgetFilterQuery,
  removeSpecificFilterQuery,
} = gadgetQuerySlice.actions;
const gadgetFilterQueryReducer = gadgetQuerySlice.reducer;
export default gadgetFilterQueryReducer;
