/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AUTH_INFO_KEY,
  AUTH_KEY,
  PROFILE_INFO_KEY,
} from "@/constant/storage.key";
import { instance as axiosInstance } from "@/helper/axios/axiosInstance";
import { getBaseUrl } from "@/helper/config/envConfig";
import {
  getFromLocalStorage,
  getFromLocalStorageAsParse,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { jwtDecode } from "jwt-decode";

export const storeToken = ({ accessToken }: { accessToken: string }) => {
  const tokenWithBearer = `Bearer ${accessToken}`;
  return localStorage.setItem(AUTH_KEY, tokenWithBearer);
};

// handle Loggedin
export const handleLoggedIn = (token: string) => {
  storeToken({ accessToken: token });
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);
  return !!authToken;
};

export const getTokenInfo = (): any => {
  if (isLoggedIn()) {
    const tokenInfo = getFromLocalStorageAsParse(AUTH_INFO_KEY);

    if (tokenInfo !== null) {
      return tokenInfo as any;
    }

    const token = getFromLocalStorage(AUTH_KEY);

    if (token) {
      const userDecodedData = jwtDecode(token.split(" ")[1] as string);

      setToLocalStorageAsStringify(AUTH_INFO_KEY, userDecodedData);
      return userDecodedData;
    }
  }
  return null;
};

// handle Logout
export const Logout = () => {
  localStorage.removeItem(PROFILE_INFO_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_INFO_KEY);
  return;
  // localStorage.clear();
};

export const removetokenInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/get-new-accessToken`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
