require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Passport config
require('./config/passport');

const app = express();

/* ===================
   MIDDLEWARE
===================== */
app.use(express.json());

app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =====================
   ROUTES
===================== */
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes.router);

app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* =====================
   ROOT PAGE with login/logout + username
===================== */
app.get('/', (req, res) => {
  const loggedIn = req.isAuthenticated();
  const username = loggedIn ? req.user.username : '';
  res.send(`
    <h1>Student & Courses API</h1>
    ${loggedIn 
      ? `<p>Logged in as <strong>${username}</strong></p><a href="/auth/logout">Logout</a>` 
      : '<a href="/auth/github">Login with GitHub</a>'}
    <br/><br/>
    <a href="/api-docs">Go to Swagger UI</a>
  `);
});

/* =====================
   DATABASE + SERVER
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
