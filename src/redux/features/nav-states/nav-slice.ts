import { createSlice } from "@reduxjs/toolkit";

interface INavSlice {
  isMobileMenuOpen: boolean;
  isDashBoardSideBarOpen: boolean;
}

const initialState: INavSlice = {
  isMobileMenuOpen: false,
  isDashBoardSideBarOpen: false,
};

const NavSlice = createSlice({
  name: "navSlice",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleSidebarMobileMenu(state) {
      
      state.isDashBoardSideBarOpen = !state.isDashBoardSideBarOpen;
    },
  },
});

export const { toggleMobileMenu, toggleSidebarMobileMenu } = NavSlice.actions;
const navSliceReducer = NavSlice.reducer;
export default navSliceReducer;
