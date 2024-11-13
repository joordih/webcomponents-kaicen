import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import Route from './routes';
import Database from './database';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Route(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: '*',
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private syncDatabase(): void {
    const database = new Database();
    database.sequelize?.sync();
  }
}