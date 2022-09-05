import 'reflect-metadata';
import express from 'express';
import altConfig from './ormconfig';
import { createConnection, DataSource } from 'typeorm';
import { parsePort } from './utils/NumberUtils';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ApiRouter from './api/api.router';

declare global {
  namespace Express {
    interface Request {
      userId: number;
      authToken: string;
    }
  }
}

(async () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use('/api', ApiRouter);

  const ds = new DataSource(altConfig);
  ds.initialize().then(() => {
    console.log('Database started');
  });

  app.listen(parsePort(process.env.PORT), () => {
    console.log(`Server started on *:${parsePort(process.env.PORT)}`);
  });
})();
