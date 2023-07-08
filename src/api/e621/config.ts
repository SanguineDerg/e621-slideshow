import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { readUser } from '../../slices/settingsSlice';

const USER_AGENT = "SanguineDerg's Slideshow/1.0 (by SanguineDerg on e621)";

const _axios = axios.create({
  baseURL: 'https://e621.net',
});

_axios.interceptors.request.use(config => {
  // Add user agent through URL params
  config.params = {
    ...config.params,
    _client: USER_AGENT,
  };

  // Account Settings
  const user = readUser();
  if (user != null) {
    // Configure base url
    config.baseURL = user.site;
    // Add HTTP Basic Auth
    config.auth = {
      username: user.username,
      password: user.apiKey,
    };
  }

  // Add Origin header for CORS
  config.headers = {
    ...config.headers,
    "Origin": window.location.origin,
  }

  return config;
});

export const e621 = rateLimit(_axios, {maxRPS: 1});
