/** Public site URL + base path. Pages build: https://ianmadez.github.io/lipapesa */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + BASE_PATH;
export const PUBLIC_ROUTES = ["/", "/about/", "/developers/", "/login/", "/signup/"];
