import axios from "../axios";
export const apiGetProducts = (params) => {
  return axios({
    method: "GET",
    url: "/product",
    params,
  });
};
