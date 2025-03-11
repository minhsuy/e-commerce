import axios from "../axios";
export const apiRegister = (data) => {
  return axios({
    method: "POST",
    url: "/user/register",
    data,
    withCredentials: true,
  });
};
export const apiLogin = (data) => {
  return axios({
    method: "POST",
    url: "/user/login",
    data,
  });
};
export const apiForgotPassword = (data) => {
  return axios({
    method: "POST",
    url: "/user/forgotpassword",
    data,
  });
};
export const apiResetPassword = (data) => {
  return axios({
    method: "PUT",
    url: "/user/resetpassword",
    data,
  });
};
export const apiGetCurrent = () => {
  return axios({
    method: "GET",
    url: "/user/current",
  });
};
