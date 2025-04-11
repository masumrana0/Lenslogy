import { createSlice } from "@reduxjs/toolkit";

interface INavSlice {
  isMobileMenuOpen: boolean;
}

const initialState: INavSlice = {
  isMobileMenuOpen: false,
};

const NavSlice = createSlice({
  name: "navSlice",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const { toggleMobileMenu } = NavSlice.actions;
const navSliceReducer = NavSlice.reducer;
export default navSliceReducer;
