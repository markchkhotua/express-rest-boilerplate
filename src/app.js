import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import indexRouter from './routes';

const app = express();

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 100,
  max: 1000,
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json({limit: '1024kb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

export default app;
