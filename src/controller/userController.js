import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email, description } = newUser;
      const token = jwt.sign(
        { id, email, description, nome },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.json(token);
    } catch (e) {
      return res.json(e);
    }
  }
  async index(req, res) {
    try {
      const users = await User.findAll();
      const returnedUsers = [];
      users.map((user) => {
        returnedUsers.push({
          id: user.id,
          nome: user.nome,
          description: user.description,
        });
      });
      return res.json(returnedUsers);
    } catch (e) {
      return res.json(e);
    }
  }

  async showUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const { nome, email, description } = user;
      return res.json({
        nome: nome,
        email: email,
        description: description,
      });
    } catch (e) {
      return res.json(e);
    }
  }
  async deleteUser(req, res) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ Error: "Missing ID" });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ Error: "User not found" });
      }
      await user.destroy();
      return res.json({
        Message: "User was deleted successfully",
      });
    } catch (err) {
      return res.json({ Error: err });
    }
  }

  async updateUser(req, res) {
    try {
      if (!req.params.id) {
        return res.status(404).json({ Error: "Missing ID" });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ Error: "User not found" });
      }
      const updatedUser = await user.update(req.body);
      return res.json(updatedUser);
    } catch (err) {
      return res.json({ Error: err });
    }
  }
}

export default new UserController();
