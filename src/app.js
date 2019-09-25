import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import indexRouter from './routes';

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

export default app;
