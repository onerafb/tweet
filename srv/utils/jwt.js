import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "600d",
  });

  res.cookie("jwt", token, {
    maxAge: 600 * 24 * 60 * 60 * 1000, // 600 days
    httpOnly: true,
    secure: true,
  });

  return token;
};

export default generateTokenAndSetCookie;
