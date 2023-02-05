import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorization =
  (credentials = []) =>
  async (req, res, next) => {
    if (typeof credentials === "string") {
      credentials = [credentials];
    }

    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send("An authentication token is required.");
    }

    const verifyToken = token.slice(7);
    jwt.verify(verifyToken, process.env.TOKEN_KEY, (error, decoded) => {
      if (error) return res.status(401).send("Invalid token provided.");

      if (credentials.length > 0) {
        if (
          decoded.scopes &&
          decoded.scopes.length &&
          credentials.some((cred) => decoded.scopes.indexOf(cred) >= 0)
        ) {
          return next();
        } else {
          return res.status(401).send("Error: Access Denied");
        }
      }
      return next();
    });
  };

export default authorization;
