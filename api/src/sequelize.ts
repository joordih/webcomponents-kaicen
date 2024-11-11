import { Sequelize } from "sequelize-typescript";
import { Order } from "./models/order";
import { Dialect } from "sequelize";

import * as config from './config/config.json';
import { User } from "./models/user";

const env = 'development';
const databaseConfig = config[env] as {
  database: string,
  username: string,
  password: string,
  host: string,
  dialect: Dialect,
};

const sequelize = new Sequelize({
  database: databaseConfig.database,
  username: databaseConfig.username,
  password: databaseConfig.password,
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  models: [Order, User],
  logging: false
});

export default sequelize;