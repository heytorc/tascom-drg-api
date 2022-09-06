require('dotenv').config();

import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 4000, () => console.log(`Server started in ${process.env.PORT} port!`));