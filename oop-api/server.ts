import express, { Application } from 'express';
import Server from './src/index';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 8080;

app.
  listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (error: any) => {
    console.log(error);
  });