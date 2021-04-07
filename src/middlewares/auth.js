import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login Required"],
    });
  }

  const [token] = authorization.split(" ");
  console.log(authorization);
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(dados);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    console.log(token);

    return res.status(401).json({
      e,
    });
  }
};
