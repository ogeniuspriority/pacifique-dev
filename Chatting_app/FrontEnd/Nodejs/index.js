const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index.js');
const callRoutes = require('./src/routes/call.js');
const {
  successResponse,
  errorResponse,
} = require('./src/helpers/responses.js');
const userRoutes = require('./src/routes/userRoutes.js');

dotenv.config();
const app = express();
const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
  },
});
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
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

app.use('/peerjs', peerServer);
app.use('/', routes);
app.use('/call', callRoutes);
app.use('/api/', userRoutes);
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
  });
});
app.use((req, res) => errorResponse(res, 400, 'The route was not found'));
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
