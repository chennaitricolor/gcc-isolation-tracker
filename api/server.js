const express = require('express');
const path = require('path');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;
const app = express();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    name: 'gcc-isolation-tracker',
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    expires: Date.now() + (7 * 86400 * 1000)
  }),
);

const corsOptions = {
    origin: false,
}

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// });
routes.bind(app);

var authorized = (req, res, next) => {
  if (req.session.user && req.cookies['gcc-isolation-tracker']) {
    next();
  } else {
    res.redirect('/');
  }
};

app.get('/', function (req, res) {
  if (req.session.user && req.cookies['gcc-isolation-tracker']) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  }
});

app.get('/dashboard', authorized, function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(express.static(path.join('build')));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
});
