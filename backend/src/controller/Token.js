import User from "../models/User";
import jwt from "jsonwebtoken";

class Token {
  async store(req, res) {
    const { email = "", password = "" } = req.body;
    if (!email || !password) {
      return res.status(401).json({ errors: ["Credenciais inválidas"] });
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ errors: ["Usuário Inexistente"] });
    }
    if (!(await user.validatePassword(password))) {
      return res.status(401).json({ errors: ["Senha Inválida"] });
    }
    const { id, description, nome } = user;
    const token = jwt.sign(
      { id, nome, description, email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRE,
      }
    );

    res.json(token);
  }
}

export default new Token();
