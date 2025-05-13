// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable prefer-const */

// import { AUTH_KEY } from "@/constant/storage.key";
// // import { getNewAccessToken, storeToken } from "@/service/auth.service";
// // import { removeFromLocalStorage } from "@/utils/local-storage";

// import axios from "axios";

// const instance = axios.create();
// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.timeout = 60000;

// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     const bearerToken = localStorage.getItem(AUTH_KEY);
//     if (bearerToken) {
//       config.headers.Authorization = bearerToken.split(" ")[1];
//     }

//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },

//   async function (error) {
//     // const config = error?.config;

//     // if (error?.response?.status === 403 && !config?.sent) {
//     //   // config.sent = true;
//     //   // const response = await getNewAccessToken();
//     //   // // console.log(response);
//     //   // const accessToken = response?.data?.accessToken;
//     //   // config.headers["Authorization"] = accessToken;
//     //   // storeToken({ accessToken: accessToken });
//     //   // return instance(config);
//     // } else {
//     //   // console.log(error);
//     //   // if (error?.response?.status === 403 || error?.response?.status === 401) {
//     //   //   removeFromLocalStorage(AUTH_KEY);
//     //   // }
//     //   let responseObject: any = {
//     //     statusCode: error?.response?.status || 500,
//     //     message: "Something went wrong",
//     //     success: false,
//     //     errorMessages: [],
//     //   };
//     //   // Check if the error response has the expected structure
//     //   if (error?.response?.data) {
//     //     responseObject.message =
//     //       error?.response?.data?.message || responseObject.message;
//     //     responseObject.success =
//     //       error?.response?.data?.success || responseObject.success;

//     //     if (error?.response?.data?.errorMessage) {
//     //       responseObject.errorMessages.push(
//     //         error?.response?.data?.errorMessage
//     //       );
//     //     }
//     //   }
//     //   return Promise.reject(responseObject);
//     // }

//     return Promise.reject(error);
//   }
// );

// export { instance };
