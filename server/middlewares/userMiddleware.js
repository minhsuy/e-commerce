import { checkSchema } from "express-validator";

export const registerMiddleware = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is reuired !",
    },
    isEmail: {
      errorMessage: "Email is invalid !",
    },
    custom: {
      options: (value, { req }) => {},
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
});
