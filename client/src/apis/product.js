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
