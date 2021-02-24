import express from 'express';
import path from 'path';
import routes from './src/routes/index.js';
import callRoutes from './src/routes/call.js';

const app = express();
const PORT = 5000;

const __dirname = path.resolve(path.dirname(''));
app.use(express.static('./public'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));
// app.use('/images', express.static(__dirname + 'public/images'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/call', callRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
