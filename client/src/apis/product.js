import axios from "../axios";
export const apiGetProducts = (params) => {
  return axios({
    method: "GET",
    url: "/product",
    params,
  });
};
export const apiGetProduct = (pid) => {
  return axios({
    method: "GET",
    url: "/product/" + pid,
  });
};
export const apiRatings = (data) => {
  return axios({
    method: "PUT",
    url: "/product/ratings",
    data,
  });
};
export const apiCreateProduct = (data) => {
  return axios({
    method: "POST",
    url: "/product/",
    data,
  });
};
export const apiUpdateProduct = (data, pid) => {
  return axios({
    method: "PUT",
    url: "/product/" + pid,
    data,
  });
};
export const apiDeleteProduct = (pid) => {
  return axios({
    method: "DELETE",
    url: "/product/" + pid,
  });
};
export const apiAddVarriant = (data, pid) => {
  return axios({
    method: "POST",
    url: "/product/varriant/" + pid,
    data,
  });
};
