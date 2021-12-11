import axios from "axios";
import rateLimit from "axios-rate-limit";

const USER_AGENT = "SanguineDerg's Slideshow/1.0 (by SanguineDerg on e621)";

const _axios = axios.create({
  baseURL: "https://e621.net/",
});

_axios.interceptors.request.use(config => {
  // Add user agent through URL params
  config.params._client = USER_AGENT;

  // TODO enable auth
  // const username = localStorage.getItem("username");
  // const api_key = localStorage.getItem("api_key");

  // // Add HTTP Basic Auth
  // if (username !== null && api_key !== null) {
  //   config.auth = {
  //     username: "",
  //     password: api_key,
  //   };
  // }

  return config;
});

export const e621 = rateLimit(_axios, {maxRPS: 1});
