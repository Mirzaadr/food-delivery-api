import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

console.log(`Company Config : Using Environment "${process.env.NODE_ENV}"`)

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res, next) => {
  res.status(200).send("Welcome");
});

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(port, () => {
  console.log(`Live at ${server.address().port}`);
});

export default app;
