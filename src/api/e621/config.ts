import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { readUserAccount } from '../../slices/accountsSlice';

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
  const account = readUserAccount();
  if (account != null) {
    // Configure base url
    config.baseURL = account.site;
    // Add HTTP Basic Auth
    config.auth = {
      username: account.username,
      password: account.apiKey,
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
