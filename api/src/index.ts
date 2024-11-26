import express, { Application } from 'express';
import cors from 'cors';
import Route from './routes';
import Database from './database';
import { executeServices } from '@services/services';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    executeServices(app);
    new Route(app);

  }

  private config(app: Application): void {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private syncDatabase(): void {
    const database = new Database();
    database.connectDatabase();
    database.sequelize?.sync();
  }
}

const app: Application = express();
new Server(app);
const PORT: number = 8080;

app.
  listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (error: any) => {
    console.log(error);
  });