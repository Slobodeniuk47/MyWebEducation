// src/env/index.ts

const BASE_URL: string = process.env.REACT_APP_BASE_URL as string;
const GOOGLE_AUTH_CLIENT_ID: string = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string;
const SERVER_URL: string = process.env.REACT_APP_SERVER_URL as string;

if (!BASE_URL) {
  console.warn('❗ BASE_URL is not defined in .env');
}
if (!GOOGLE_AUTH_CLIENT_ID) {
  console.warn('❗ GOOGLE_AUTH_CLIENT_ID is not defined in .env');
}

const APP_ENV = {
  BASE_URL,
  GOOGLE_AUTH_CLIENT_ID,
  SERVER_URL,
  API_URL: BASE_URL.endsWith('/') ? `${BASE_URL}api/` : `${BASE_URL}/api/`
};

export { APP_ENV };
