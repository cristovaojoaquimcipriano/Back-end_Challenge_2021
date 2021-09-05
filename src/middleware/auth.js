const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).send({ message: "No token provider" });

  const parts = authorization.split(" ");
  if (!parts.length === 2)
    return res.status(401).send({ message: "Token Invalid!" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "No token formated" });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) return res.status(401).send({ message: "Token Invalid!" });
    req.userId = decoded.id;
    return next();
  });
};
