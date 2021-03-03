import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './src/routes/index.js';
import callRoutes from './src/routes/call.js';
import { successResponse, errorResponse } from './src/helpers/responses.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
const db = process.env.mongodb;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => {
    return app.use((req, res) =>
      errorResponse(res, 500, 'Something went wrong! Plase try again...')
    );
  });
app.get('/api/', (req, res) =>
  successResponse(res, 200, 'WELCOME TO PACIFIQUE_DEV Backend', '')
);
app.use(express.static('./public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/call', callRoutes);
app.use('/api/', userRoutes);
app.use((req, res) => errorResponse(res, 400, 'The route was not found'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
