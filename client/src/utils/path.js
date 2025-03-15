const path = {
  // public
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  CONTACT: "contact",
  OUR_SERVICES: "services",
  FAQ: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",

  // admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-product",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-products",

  // member

  MEMBER: "member",
  PERSONAL: "personal",
};

export default path;
