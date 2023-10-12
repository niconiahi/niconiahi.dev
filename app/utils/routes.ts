// export const NICONIAHI_DEV_URL = "https://niconiahi-dev.pages.dev";
export const NICONIAHI_DEV_URL = "http://localhost:8788";
export const ROUTES = {
  getArticles() {
    return `/article/get/all`;
  },
  getArticle(slug: string) {
    return `/article/get/${slug}`;
  },
};
