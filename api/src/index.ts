import express, { Express } from 'express';
import cors from 'cors';
import fs from 'fs';
import sequelize from './sequelize';

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

fs.readdirSync('./src/routes/').forEach((file) => {
  require(`./routes/${file.replace('.ts', '')}`)(app);
});

app.listen(8080, () => { console.log('Server is running on port 8080'); });