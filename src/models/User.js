import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Dados incorretos, verifique seus dados",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "email existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 55],
              msg: "Senha precisa ter entre 6 e 55 caracteres",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }
  validatePassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
