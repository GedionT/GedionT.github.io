export const SITE_URL = "https://gediont.github.io";

export const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const canonicalUrl = (path = "/") => {
  const base = (import.meta.env.BASE_URL || "/").replace(/^\/+|\/+$/g, "");
  const route = path.replace(/^\/+|\/+$/g, "");
  const joined = [base, route].filter(Boolean).join("/");

  return `${SITE_URL}/${joined}${joined ? "" : ""}`;
};
