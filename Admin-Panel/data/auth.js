const jwt = require("jsonwebtoken");

export default (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      "1e8c13d0bbaed84588dfddbd226cec32e20ebb06e1889a52a96a65d363d9131e3001231b5c84ee73cf45bff4769b6e103faa84588994e0d0960a551779d67b67"
    );
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
