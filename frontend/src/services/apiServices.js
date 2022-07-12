import axios from "axios";

const baseUrl_ = "https://morning-headland-58484.herokuapp.com";

let token = localStorage.getItem("token");

const createUser = (data) => {
  return axios({
    method: "post",
    url: `${baseUrl_}/auth/users`,
    data,
    headers: {
      clientId: "A6w0Xu6",
      "Content-Type": "application/json",
    },
  });
};

const fetchUser = () => {
  return axios({
    method: "get",
    url: `${baseUrl_}/auth/users`,
  });
};

const loginUser = (data) => {
    return axios({
      method: "post",
      url: `${baseUrl_}/auth/login/`,
      data,
    headers: {
      clientId: "A6w0Xu6",
      "Content-Type": "application/json",
    },
    });
  };

  const uploadImages = (data) => {
    return axios({
      method: "post",
      url: `${baseUrl_}/image/`,
      data,
    headers: {
      clientId: "A6w0Xu6",
    },
    });
  };

export default {
  createUser,
  fetchUser,
  loginUser,
  uploadImages,

};
