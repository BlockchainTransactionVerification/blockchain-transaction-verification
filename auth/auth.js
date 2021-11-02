import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    console.log("in authentication");
    const token = req.header("x-auth-token");
    console.log("in authentication" + token);
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("in authentication verified" + verified);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default auth;
