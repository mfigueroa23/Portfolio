// A single fixed URL: the API only allows the production origin through CORS, and the
// prerender fetch at build time is not subject to CORS, so build, CI and browser share it.
export const API_URL = 'https://api.figueroa-sanchez.com';
