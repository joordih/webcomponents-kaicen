import express, { Express } from 'express';
import cors from 'cors';
import fs from 'fs';

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

fs.readdirSync('./src/routes/').forEach((file) => {
  require(`./routes/${file.replace('.ts', '')}`)(app);
});

app.listen(8080, () => { console.log('Server is running on port 8080'); });