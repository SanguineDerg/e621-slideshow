import axios from "axios";
import rateLimit from "axios-rate-limit";
import { readAPIKey, readUsername } from "../../slices/settingsSlice";

const USER_AGENT = "SanguineDerg's Slideshow/1.0 (by SanguineDerg on e621)";

const _axios = axios.create({
  baseURL: "https://e621.net/",
});

_axios.interceptors.request.use(config => {
  // Add user agent through URL params
  config.params._client = USER_AGENT;

  // Add HTTP Basic Auth
  const username = readUsername();
  const apiKey = readAPIKey();
  if (username !== '' && apiKey !== '') {
    config.auth = {
      username: username,
      password: apiKey,
    };
  }

  return config;
});

export const e621 = rateLimit(_axios, {maxRPS: 1});
