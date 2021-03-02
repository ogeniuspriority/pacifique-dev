import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import routes from './src/routes/index.js';
import callRoutes from './src/routes/call.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(path.dirname(''));
app.use(express.static('./public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/call', callRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
