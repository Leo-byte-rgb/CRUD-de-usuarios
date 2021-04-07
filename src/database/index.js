import Sequelize from "sequelize";
import config from "../../config/config";
import User from "../models/User";

const models = [User];

const connection = new Sequelize(config);

models.forEach((model) => model.init(connection));
