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
export const apiGetAllUsers = (params) => {
  return axios({
    method: "GET",
    url: "/user/",
    params,
  });
};
export const apiUpdateUser = (data, uid) => {
  return axios({
    method: "PUT",
    url: "/user/" + uid,
    data,
  });
};
export const apiDeleteUser = (uid) => {
  return axios({
    method: "delete",
    url: "/user/" + uid,
  });
};

export const apiUpdateCurrent = (data) => {
  return axios({
    method: "PUT",
    url: "/user/current",
    data,
  });
};
export const apiUpdateCart = (data) => {
  return axios({
    method: "PUT",
    url: "/user/cart",
    data,
  });
};
export const apiRemoveCart = (data) => {
  return axios({
    method: "DELETE",
    url: "/user/remove-cart",
    data,
  });
};
