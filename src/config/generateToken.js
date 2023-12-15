import jwt from "jsonwebtoken";

export const generateToken = (id, email, name, picture, isAdmin, createdAt) => {
  return jwt.sign(
    { id, email, name, picture, isAdmin, createdAt },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
};
