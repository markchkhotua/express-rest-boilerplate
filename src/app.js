import express from 'express';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import path from 'path';
import rateLimit from 'express-rate-limit';9
import helmet from 'helmet';
import morgan from 'morgan';

import indexRouter from './routes';
import rfs from 'rotating-file-stream';

const app = express();

app.use(rateLimit({
  windowMs: 15 * 60 * 100,
  max: 1000,
}));
app.use(morgan('combined', {
  stream: rfs('access.log', {
    interval: '1d', // rotate daily
    compress: 'gzip',
    path: path.join(__dirname, '../logs'),
  }),
}));
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json({limit: '1024kb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

export default app;
