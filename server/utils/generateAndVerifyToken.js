import jwt from "jsonwebtoken";

export const signToken = ({ payload, privateKey, options }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      privateKey,
      { algorithm: "HS256", ...options },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};
export const verifyToken = ({ token, privateKey, options }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, options, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};
