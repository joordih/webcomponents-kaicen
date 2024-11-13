import { Sequelize } from "sequelize-typescript";
import { config, dialect } from '../config/database.config';
import Order from '../models/order';
import fs from 'fs';
import path from 'path';

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectDatabase();
  }

  private async loadModels(): Promise<any[]> {
    const modelsDir = path.join(__dirname, '../models');
    const models: any[] = [];

    const files = fs.readdirSync(modelsDir);
    
    for (const file of files) {
      if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
        const model = require(path.join(modelsDir, file)).default;
        models.push(model);
      }
    }

    return models;
  }

  private async connectDatabase() {
    const models = await this.loadModels();

    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error);
      });
  }
}

export default Database;