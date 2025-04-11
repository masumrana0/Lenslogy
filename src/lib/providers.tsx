"use client";
import { store } from "@/redux/store/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { Provider } from "react-redux";

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </Provider>
  );
};

export default Providers;
